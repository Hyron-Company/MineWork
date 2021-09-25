import { User } from './../graphql/resolvers.d'
import mongoose, { Schema, model } from 'mongoose'

export const UserSchema = new Schema({
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
    type: mongoose.Types.ObjectId,
    ref: 'authenticationData'
  }
})

const UserModel = model('user', UserSchema)

export default UserModel
