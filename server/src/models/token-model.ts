import mongoose, { Schema, model } from 'mongoose'

export interface IToken extends mongoose.Document {
  user: mongoose.Types.ObjectId
  refreshToken: string
}

const TokenSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  refreshToken: {
    type: String,
    required: true
  }
})

const TokenModel = model<IToken>('token', TokenSchema)

export default TokenModel
