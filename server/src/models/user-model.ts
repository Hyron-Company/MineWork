import mongoose, { Schema, model } from 'mongoose'

export interface IUser extends mongoose.Document {
  email: string
  password: string
  isActivated: boolean
  activationLink: string
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isActivated: {
    type: Boolean,
    default: false
  },
  activationLink: {
    type: String
  }
})

const UserModel = model<IUser>('user', UserSchema)

export default UserModel
