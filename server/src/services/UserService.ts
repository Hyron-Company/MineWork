import bcrypt from 'bcrypt'
import { TOTP } from '@otplib/core'
import { ApolloError } from 'apollo-server-errors'
import { isEmail, isPhoneNumber } from 'class-validator'
import { RegisterInput } from './../schemas/User/RegisterInput'
import { LoginInput, UserModel } from '../schemas/User'
import { LogoutInput } from '../schemas/User/LogoutInput'
import { MailService } from './MailService'
import { SendActivationMailInput } from '../schemas/User/SendActivationMailInput'
import { TokenService } from './TokenService';

const { TOTP_SECRET, API_URL } = process.env

const totp = new TOTP({ step: 3600 })
const mailService = new MailService()
const tokenService = new TokenService()

export class UserService {
  private async findUser(login: string) {
    if (isEmail(login)) {
      return await UserModel.findOne({ email: login })
    } else if (isPhoneNumber(login)) {
      return await UserModel.findOne({ phoneNumber: login })
    }
    return await UserModel.findOne({ nickname: login })
  }

  async register(input: RegisterInput) {
    const userByEmail = await this.findUser(input.email)
    const userByNickname = await this.findUser(input.nickname)

    if (!!userByEmail) {
      throw new ApolloError('Email занят')
    } else if (!!userByNickname) {
      throw new ApolloError('Nickname занят')
    }

    const code = totp.generate(TOTP_SECRET as string)

    console.log(code);

    await mailService.sendActivationMail(input.email, `${API_URL}/activate/${input.nickname}/${code}`)

    const user = { ...input, code }

    await UserModel.create(user)

    return `Пользователь успешно зарегистрирован. Ссылка для активации аккаунта отправлена на почту ${input.email}`
  }

  async login({ login, password }: LoginInput) {
    const user = await this.findUser(login)
    const userIsValid = !!user && await bcrypt.compare(password, user.password)

    if (!userIsValid) {
      throw new ApolloError('Не верный пароль или логин')
    }

    if (!user.confirmed) {
      const code = totp.generate(TOTP_SECRET as string)

      await mailService.sendActivationMail(user.email, `${API_URL}/activate/${user.nickname}/${code}`)

      throw new ApolloError(`Подтвердите почту ${user.email}. Новая ссылка для активации уже отправлена`)
    }

    return user
  }

  async logout({ _id }: LogoutInput) {
    await tokenService.delete(_id) // TODO: get token from db
    return 'Пользователь успешно вышел'
  }

  async sendActivationMail({ email }: SendActivationMailInput) {
    const user = await this.findUser(email)
    const code = totp.generate(TOTP_SECRET as string)

    if (!user) {
      throw new ApolloError('Пользователь не найден')
    }

    await mailService.sendActivationMail(email, `${API_URL}/activate/${user.nickname}/${code}`)

    user.code = code

    await user.save()

    return `Ссылка для активации аккаунта отправлена на почту ${email}`
  }

  async activate(_nickname?: string, code?: string) {
    const user = await UserModel.findOne({ code })

    const isValid = user && code && totp.check(code, TOTP_SECRET as string)

    if (!isValid) {
      throw new ApolloError('Некорректная ссылка активации')
    }

    user.confirmed = true;

    await user.save();
  }
}
