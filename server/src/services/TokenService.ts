import { createClient } from 'redis'
import JWTR from 'jwt-redis'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Ref } from 'typegoose'
import { TokenInput, TokenModel, TokenSchema } from '../schemas/Token'

dotenv.config()
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env

export class TokenService {
  private jwtr: JWTR

  constructor() {
    this.jwtr = new JWTR(createClient())
  }

  async generate(payload: object) {
    const access = await this.jwtr.sign(payload, JWT_ACCESS_SECRET as string, { expiresIn: '30m' })
    const refresh = await jwt.sign(payload, JWT_REFRESH_SECRET as string, { expiresIn: '30d' })
    console.log('access ', jwt.decode(access))
    console.log('refresh ', jwt.decode(refresh))
    return { access, refresh }
  }

  async checkAccess(token?: string) {
    return token && Boolean(await this.jwtr.verify(token, JWT_ACCESS_SECRET as string))
  }

  async checkRefresh(token?: string) {
    if (token) {
      const isExist = Boolean(await TokenModel.findOne({ token }))
      const isValid = Boolean(await jwt.verify(token, JWT_REFRESH_SECRET as string))
      return isExist && isValid
    }

    return false
  }

  async save(token: string, ids?: [Ref<TokenSchema>]) {
    if (ids?.length) {
      let models = await TokenModel.find({ _id: { $in: ids } })

      models = models.filter(async (model) => {
        let isValid

        try {
          isValid = Boolean(await jwt.verify(model.token, JWT_REFRESH_SECRET as string))
        } catch (error) {
          await TokenModel.deleteOne({ _id: model._id })
        }

        return !!isValid
      })

      if (models.length > 5) {
        // const oldest = models.reduce((a, b) => a.createdAt < b.createdAt ? a : b)
        // await TokenModel.deleteOne({ _id: oldest._id })
      }
    }

    const input: TokenInput = {
      token,
    }

    await TokenModel.create(input)
  }

  async find(_id: Ref<TokenSchema>) {
    return await TokenModel.findOne({ _id })
  }

  async delete(access?: string, refresh?: string) {
    access && await this.jwtr.destroy(access)
    refresh && await TokenModel.deleteOne({ token: refresh })
  } 
}
