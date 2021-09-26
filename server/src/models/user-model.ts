import mongoose, { Schema, model } from 'mongoose'
import { IUserSchema } from '../graphql/models'

export const UserSchema = new Schema<IUserSchema>({
  email: {
    type: String,
    unique: true,
    required: true
  },
  city: String,
  name: {
    required: true,
    type: String
  },
  surname: {
    required: true,
    type: String
  },
  phoneNumber: {
    required: true,
    type: String
  },
  nick: {
    required: true,
    unique: true,
    type: String
  },
  authenticationData: {
    type: Schema.Types.ObjectId,
    ref: 'authenticationData'
  }
})

const UserModel = model<IUserSchema>('user', UserSchema)

export default UserModel
