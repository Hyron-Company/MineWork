import { Schema, model } from 'mongoose'
import { ITokenSchema } from '../graphql/models'

const TokenSchema = new Schema<ITokenSchema>({
  user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  ip: {
    type: String
    // required: true
  },
  accessToken: {
    type: String
    // required: true
  },
  refreshToken: {
    type: String
    // required: true
  }
})

const TokenModel = model<ITokenSchema>('token', TokenSchema)

export default TokenModel
