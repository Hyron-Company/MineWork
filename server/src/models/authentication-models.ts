import mongoose, { Schema, model } from 'mongoose'
import { AuthenticationData } from '../graphql/resolvers'

const AuthenticationSchema = new Schema({
  userID: {
      type: mongoose.Types.ObjectId,
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
      type: mongoose.Types.ObjectId,
      ref: 'token'
  }
})

const AuthenticationModel = model('authentication-data', AuthenticationSchema)

export default AuthenticationModel
