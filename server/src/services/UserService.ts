import bcrypt from 'bcrypt'
import { ApolloError } from 'apollo-server-errors'
import { isEmail, isPhoneNumber } from 'class-validator'
import { RegisterInput } from './../schemas/User/RegisterInput'
import { LoginInput, UserModel } from '../schemas/User'
import { LogoutInput } from '../schemas/User/LogoutInput'

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

    await UserModel.create(input)

    return 'Пользователь успешно зарегистрирован'
  }

  async login({ login, password }: LoginInput) {
    const user = await this.findUser(login)
    const userIsValid = !!user && await bcrypt.compare(password, user.password)

    if (!userIsValid) {
      throw new ApolloError('Не верный пароль или логин')
    }

    return user
  }

  async logout(input: LogoutInput) {
    console.log(input)
  }
}