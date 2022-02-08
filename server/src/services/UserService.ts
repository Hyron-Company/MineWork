import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { TOTP } from '@otplib/core'
import { createDigest } from '@otplib/plugin-crypto'
import { ApolloError } from 'apollo-server-errors'
import { isEmail, isPhoneNumber } from 'class-validator'
import { ExpressContext } from 'apollo-server-express'
import { CookieOptions } from 'express'
import { LoginInput, UserModel, RegisterInput, SendActivationMailInput } from '../schemas/User'
import { MailService } from './MailService'
import { TokenService } from './TokenService'

dotenv.config()
const { TOTP_SECRET, SERVER_URL } = process.env

export class UserService {
  private totp
  private mailService
  private tokenService
  private cookieOptions: CookieOptions

  constructor() {
    this.totp = new TOTP({ step: 3600, createDigest })
    this.mailService = new MailService()
    this.tokenService = new TokenService()
    this.cookieOptions = { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true, secure: true }
  }

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

    if (userByEmail) {
      throw new ApolloError('Email занят')
    } else if (userByNickname) {
      throw new ApolloError('Nickname занят')
    }

    const code = this.totp.generate(TOTP_SECRET)

    await this.mailService.sendActivationMail(input.email, `${SERVER_URL}/activate/${input.nickname}/${code}`)

    const user = { ...input, code }

    await UserModel.create(user)

    return `Пользователь успешно зарегистрирован. Ссылка для активации аккаунта отправлена на почту ${input.email}`
  }

  async login({ login, password }: LoginInput, context: ExpressContext) {
    const user = await this.findUser(login)
    const userIsValid = user && await bcrypt.compare(password, user.password)

    if (!userIsValid) {
      throw new ApolloError('Не верный пароль или логин')
    }

    if (!user.confirmed) {
      const code = this.totp.generate(TOTP_SECRET)
      await this.mailService.sendActivationMail(user.email, `${SERVER_URL}/activate/${user.nickname}/${code}`)

      throw new ApolloError(`Подтвердите почту ${user.email}. Новая ссылка для активации уже отправлена`)
    }

    const { access, refresh } = await this.tokenService.generate({ _id: user._id, ip: context.req.ip })
    user.accessToken = access

    await this.tokenService.save(refresh, context.req.ip, user)

    const ipIndex = await this.tokenService.findIpIndex(context.req.ip, user.tokenIDs)

    if (user.tokenIDs?.length && (ipIndex === undefined || ipIndex === -1)) {
      await this.mailService.send(
        user.email,
        'Предупреждение',
        `<h3>Внимание</h3><br/><p>Только что в ваш аккаунт MineWork вошли с нового айпи адреса: ${context.req.ip}<br/>Если это вы то просто проигнорируйте это сообщение</p>`
      )
    }

    context.res.cookie('token', refresh, this.cookieOptions)

    return access
  }

  async logout(context: ExpressContext) {
    const access = context.req.headers.authorization
    const refresh = context.req.cookies.token

    await this.tokenService.delete(access, refresh)

    return 'Пользователь успешно вышел'
  }

  async refresh(context: ExpressContext) {
    const oldAccess = context.req.headers.authorization
    const oldRefresh = context.req.cookies.token
    const isValid = await this.tokenService.checkRefresh(oldRefresh)
    const payload = this.tokenService.decodeRefresh(oldRefresh)
    const user = payload && await UserModel.findOne({ _id: payload._id })

    if (!isValid || !user) {
      throw new ApolloError('Пользователь не залогинен')
    }

    await this.tokenService.delete(oldAccess, oldRefresh)

    const { access, refresh } = await this.tokenService.generate({ _id: user._id, ip: context.req.ip })
    user.accessToken = access

    await this.tokenService.save(refresh, context.req.ip, user)

    context.res.cookie('token', refresh, this.cookieOptions)

    return access
  }

  async sendActivationMail({ email }: SendActivationMailInput) {
    const user = await this.findUser(email)
    const code = this.totp.generate(TOTP_SECRET)

    if (!user) {
      throw new ApolloError('Пользователь не найден')
    }

    await this.mailService.sendActivationMail(email, `${SERVER_URL}/activate/${user.nickname}/${code}`)

    user.code = code

    await user.save()

    return `Ссылка для активации аккаунта отправлена на почту ${email}`
  }

  async activate(nickname?: string, code?: string) {
    const user = await UserModel.findOne({ code })

    const isValid = user && code && user.nickname === nickname && this.totp.check(code, TOTP_SECRET)

    if (!isValid) {
      throw new ApolloError('Некорректная ссылка активации')
    }

    user.confirmed = true

    await user.save()
  }
}
