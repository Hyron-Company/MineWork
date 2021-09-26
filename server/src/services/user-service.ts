import { MutationRegistrationArgs } from './../graphql/resolvers.d'
import UserModel from '../models/user-model'
import bcrypt from 'bcrypt'
import UserDto from '../dtos/user-dto'
import AuthenticationModel from '../models/authentication-models'
import TokenSerivce from './token-serivce'

class UserService {
  registration = async ({ input }: MutationRegistrationArgs) => {
    const { email, password, nickname } = { ...input }

    const candidate = await UserModel.findOne({ $or: [{ email }, { nickname }] })

    if (candidate) {
      throw new Error(`Пользователь с почтой ${email} уже существует`)
    }

    const hashPassword = await bcrypt.hash(password!, +process.env.HASH_PASSWORD_LEVEL!)
    const activationCode = Math.random().toString(36).slice(-6).toUpperCase();
    const user = await UserModel.create({ ...input })
    const authenticationData = await AuthenticationModel.create({ login: email, password: hashPassword, activationCode, user })
    user.authenticationData = authenticationData._id;
    user.save();

    return user
  }

  activate = async (activationCode: string) => {
    const authenticationData = await AuthenticationModel.findOne({ activationCode })

    if (!authenticationData) {
      throw new Error('Некоректный код активации')
    }

    authenticationData.isActive = true

    const user = await UserModel.findById(authenticationData.user);
    const userDto = UserDto.payloadToken({...user, ...authenticationData});
    const tokens = TokenSerivce.generateTokens(userDto);
    const token = await TokenSerivce.saveToken(user?._id, tokens.refreshToken);
    authenticationData.tokens?.push(token._id);

    authenticationData.save()
  }
}

export default new UserService()
