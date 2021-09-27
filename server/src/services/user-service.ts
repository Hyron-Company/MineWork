import { MutationRegistrationArgs, MutationLoginArgs } from './../graphql/resolvers.d'
import UserModel from '../models/user-model'
import bcrypt from 'bcrypt'
import UserDto from '../dtos/user-dto'
import AuthenticationModel from '../models/authentication-models'
import TokenSerivce from './token-serivce'
import ApiError from '../exceptions/api-error'
import { genCode } from '../functions/generate-active-code'

export default class UserService {
  static async registration({ input }: MutationRegistrationArgs) {
    const { email, password, nickname } = { ...input }

    const candidate = await UserModel.findOne({ $or: [{ email }, { nickname }] })

    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтой ${email} или с ником ${nickname} уже существует`)
    }

    const hashPassword = await bcrypt.hash(password!, +process.env.HASH_PASSWORD_LEVEL!)
    const activationCode = genCode()
    const user = await UserModel.create({ ...input })
    const authenticationData = await AuthenticationModel.create({
      login: email,
      password: hashPassword,
      activationCode,
      user
    })
    user.authenticationData = authenticationData._id
    user.save()

    return user
  }

  static async activate(activationCode: string) {
    const authenticationData = await AuthenticationModel.findOne({ activationCode })

    if (!authenticationData) {
      throw new Error('Некоректный код активации')
    }

    authenticationData.isActive = true
    authenticationData.remove({ fields: 'activationCode' })

    const user = await UserModel.findById(authenticationData.user)
    const userDto = UserDto.payloadToken({ ...user, ...authenticationData })
    const tokens = TokenSerivce.generateTokens(userDto)
    const token = await TokenSerivce.saveToken(user?._id, tokens.refreshToken)
    authenticationData.tokens?.push(token._id)

    authenticationData.save()
  }

  static async login({ login, password }: MutationLoginArgs) {
    const user = await UserModel.findOne({ $or: [{ nickname: login! }, { email: login! }] })
    if (!user) {
      throw ApiError.BadRequest('Пользователь не найден');
    }
    const authenticationData = await AuthenticationModel.findOne({ user: user._id });
    const passwordValid = await bcrypt.compare(password!, authenticationData?.password || '');
    if (passwordValid) {
      throw ApiError.BadRequest('Неверный пароль')
    }
    const userDto = UserDto.payloadToken(user);
    const tokens = TokenSerivce.generateTokens(userDto)
    const token = await TokenSerivce.saveToken(user?._id, tokens.refreshToken)
    authenticationData?.tokens?.push(token._id)

    authenticationData?.save()

  }

  constructor () {return }
}
