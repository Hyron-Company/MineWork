import mongoose, { Schema, model } from 'mongoose'
import { Token } from '../graphql/resolvers'

const TokenSchema = new Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  ip: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  }
})

const TokenModel = model('token', TokenSchema)

export default TokenModel
