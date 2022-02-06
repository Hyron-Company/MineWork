import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { TOTP } from '@otplib/core'
import { ApolloError } from 'apollo-server-errors'
import { isEmail, isPhoneNumber } from 'class-validator'
import { RegisterInput } from './../schemas/User/RegisterInput'
import { LoginInput, UserModel } from '../schemas/User'
import { RefreshInput } from '../schemas/User/RefreshInput'
import { MailService } from './MailService'
import { SendActivationMailInput } from '../schemas/User/SendActivationMailInput'
import { TokenService } from './TokenService'
import { Context } from '../types/Context'
import { TokenSchema } from '../schemas/Token'
import { Ref } from 'typegoose'

dotenv.config()
const { TOTP_SECRET, API_URL } = process.env

export class UserService {
  private totp
  private mailService
  private tokenService

  constructor() {
    this.totp = new TOTP({ step: 3600 })
    this.mailService = new MailService()
    this.tokenService = new TokenService()
  }

  private async findUser(login: string) {
    if (isEmail(login)) {
      return await UserModel.findOne({ email: login })
    } else if (isPhoneNumber(login)) {
      return await UserModel.findOne({ phoneNumber: login })
    }
    return await UserModel.findOne({ nickname: login })
  }

  async register(input: RegisterInput, context: Context) {
    console.log('context ', context)
    const userByEmail = await this.findUser(input.email)
    const userByNickname = await this.findUser(input.nickname)

    if (!!userByEmail) {
      throw new ApolloError('Email занят')
    } else if (!!userByNickname) {
      throw new ApolloError('Nickname занят')
    }

    const code = this.totp.generate(TOTP_SECRET as string)
    console.log(code) // TODO: delete

    await this.mailService.sendActivationMail(input.email, `${API_URL}/activate/${input.nickname}/${code}`)

    const user = { ...input, code }

    await UserModel.create(user)

    return `Пользователь успешно зарегистрирован. Ссылка для активации аккаунта отправлена на почту ${input.email}`
  }

  async login({ login, password }: LoginInput, context: Context) {
    console.log('context ', context)
    const user = await this.findUser(login)
    const userIsValid = !!user && await bcrypt.compare(password, user.password)

    if (!userIsValid) {
      throw new ApolloError('Не верный пароль или логин')
    }

    if (!user.confirmed) {
      const code = this.totp.generate(TOTP_SECRET as string)
      console.log(code) // TODO: delete

      await this.mailService.sendActivationMail(user.email, `${API_URL}/activate/${user.nickname}/${code}`)

      throw new ApolloError(`Подтвердите почту ${user.email}. Новая ссылка для активации уже отправлена`)
    }

    const { access, refresh } = await this.tokenService.generate({ _id: user._id, ip: context.ip })
    user.accessToken = access

    await this.tokenService.save(refresh, user.tokenIDs)

    const ipIndex = user.tokenIDs?.findIndex(async (_id: Ref<TokenSchema>) => {
      const model = await this.tokenService.find({ _id })
      return model?.id === context.ip
    })

    if (ipIndex === undefined || ipIndex === -1) {
      await this.mailService.send(
        user.email,
        'Предупреждение',
        '<h3>Внимание!</h3><br/></h1>Только что в ваш аккаунт MineWork вошли с нового айпи адреса. Если это вы то просто проигнорируйте это сообщение<h1>'
      )
    }

    return user
  }

  async logout(context: Context) {
    const access = context.headers.authorization
    const refresh = context.cookies.token
    await this.tokenService.delete(access, refresh)
    return 'Пользователь успешно вышел'
  }

  async refresh({ _id }: RefreshInput, context: Context) {
    const oldAccess = context.headers.authorization
    const oldRefresh = context.cookies.token
    const isValid = this.tokenService.checkRefresh(oldRefresh)
    const user = await UserModel.findOne({ _id })

    if (!isValid || !user) {
      throw new ApolloError('Пользователь не залогинен')
    }

    await this.tokenService.delete(oldAccess, oldRefresh)

    const { access, refresh } = await this.tokenService.generate({ _id: user._id, ip: context.ip })
    user.accessToken = access

    await this.tokenService.save(refresh, user.tokenIDs)

    return access
  }

  async sendActivationMail({ email }: SendActivationMailInput) {
    const user = await this.findUser(email)
    const code = this.totp.generate(TOTP_SECRET as string)

    if (!user) {
      throw new ApolloError('Пользователь не найден')
    }

    await this.mailService.sendActivationMail(email, `${API_URL}/activate/${user.nickname}/${code}`)

    user.code = code

    await user.save()

    return `Ссылка для активации аккаунта отправлена на почту ${email}`
  }

  async activate(_nickname?: string, code?: string) {
    const user = await UserModel.findOne({ code })

    const isValid = user && code && this.totp.check(code, TOTP_SECRET as string)

    if (!isValid) {
      throw new ApolloError('Некорректная ссылка активации')
    }

    user.confirmed = true

    await user.save()
  }
}
