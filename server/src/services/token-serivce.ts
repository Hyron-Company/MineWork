import jwt from 'jsonwebtoken'
import TokenModel from '../models/token-model'
import mongoose from 'mongoose'
import { UserPayloadTokenDto } from '../dtos/user-dto'

class TokenService {
  generateTokens = (payload: UserPayloadTokenDto) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || 'sercer-key', { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'sercer-key', { expiresIn: '30d' })

    return {
      accessToken,
      refreshToken
    }
  }

  saveToken = async (userId: mongoose.Schema.Types.ObjectId, refreshToken: string) => {
    const tokenData = await TokenModel.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
    }
    const token = await TokenModel.create({ user: userId, refreshToken })
    return token
  }
}

export default new TokenService();
