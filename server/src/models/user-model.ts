import mongoose, { Schema, model } from 'mongoose'
import { IUserSchema } from '../graphql/models'

export const UserSchema = new Schema<IUserSchema>({
  email: {
    type: String,
    unique: true,
    required: true
  },
  fullName: {
    required: true,
    type: String
  },
  nickname: {
    required: true,
    unique: true,
    type: String
  },
  authenticationData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'authentication-data'
  }
})

const UserModel = model<IUserSchema>('user', UserSchema)

export default UserModel
