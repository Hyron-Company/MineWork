import UserModel from '../models/user-model'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import UserDto from '../dtos/user-dto'
import TokenService from './token-serivce'
import { MutationRegistrationArgs } from '../graphql/resolvers'

class UserService {
  registration = async ({ email, password }: MutationRegistrationArgs) => {
    const candidate = await UserModel.findOne({ email })

    if (candidate) {
      throw new Error(`Пользователь с почтой ${email} уже существует`)
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const activationCode = v4()
    const user = await UserModel.create({ email, password: hashPassword, activationCode })

    //   await sendActivationMail(email, `http://localhost:5000/`)

    const userDto = user as UserDto
    const tokens = TokenService.generateTokens(userDto)
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    //   res.cookie('refreshToken', tokens.refreshToken, {
    //     httpOnly: true,
    //     maxAge: 30 * 24 * 60 * 60 * 1000
    //   });

    return {
      ...tokens,
      ...userDto
    }
  }

  activate = async (activationCode: string) => {
    const user = await UserModel.findOne({ activationCode })

    if (!user) {
      throw new Error('Некоректный код активации')
    }

    user.isActivated = true
    user.save()
  }
}

export default new UserService()
