import { IAuthenticationDataSchema, IUserSchema } from '../graphql/models'

class UserDto {
  payloadToken(user: Partial<IUserSchema & IAuthenticationDataSchema>) : UserPayloadTokenDto {
    return {
      email: user.email || '',
      nickname: user.nickname || '',
      password: user.password || ''
    }
  }
}

export interface UserPayloadTokenDto {
  email: string
  nickname: string
  password: string
}

export default new UserDto()
