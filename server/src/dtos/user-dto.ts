import mongoose from 'mongoose'
import { IAuthenticationDataSchema, IUserSchema } from '../graphql/models'

class UserDto {
  payloadToken(user: Partial<IUserSchema & IAuthenticationDataSchema>) : UserPayloadTokenDto {
    return {
      email: user.email!,
      nickname: user.nickname!,
      password: user.password!
    }
  }
}

export interface UserPayloadTokenDto {
  email: String
  nickname: String
  password: String
}

export default new UserDto()
