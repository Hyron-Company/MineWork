import { IAuthenticationDataSchema, IUserSchema } from '../graphql/models'

export default class UserDto {
  static payloadToken(user: Partial<IUserSchema & IAuthenticationDataSchema>) : UserPayloadTokenDto {
    return {
      email: user.email || '',
      nickname: user.nickname || '',
      password: user.password || ''
    }
  }

  constructor() {return }
}

export interface UserPayloadTokenDto {
  email: string
  nickname: string
  password: string
}

