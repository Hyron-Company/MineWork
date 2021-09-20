import { IUserDto } from './../dtos/user-dto';
import { IToken } from './../../models/token-model';
import jwt from 'jsonwebtoken'
import TokenModel from '../../models/token-model'
import mongoose from 'mongoose'

export const generateTokens = (payload: IUserDto) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || 'sercer-key', { expiresIn: '30m' })
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'sercer-key', { expiresIn: '30d' })

  return {
    accessToken,
    refreshToken
  }
}

export const saveToken = async (userId: mongoose.Types.ObjectId, refreshToken: string) : Promise<IToken> => {
  const tokenData = await TokenModel.findOne({ user: userId })
  if (tokenData) {
    tokenData.refreshToken = refreshToken
  }
  const token = await TokenModel.create({ user: userId, refreshToken })
  return token;
}
