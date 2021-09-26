import mongoose, { Schema, model } from 'mongoose'
import { IAuthenticationDataSchema } from '../graphql/models'

const AuthenticationSchema = new Schema<IAuthenticationDataSchema>({
  user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user'
  },
  activationCode: {
      type: String,
  },
  isActive: {
      type: Boolean,
      default: false
  },
  login: {
      type: String,
      unique: true,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  tokens: {
      type: Array(Schema.Types.ObjectId),
      ref: 'token'
  }
})

const AuthenticationModel = model<IAuthenticationDataSchema>('authentication-data', AuthenticationSchema)

export default AuthenticationModel
