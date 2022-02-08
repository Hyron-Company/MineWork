import { createClient } from 'redis'
import JWTR from 'jwt-redis'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Ref } from 'typegoose'
import { ObjectId } from 'mongoose'
import { TokenInput, TokenModel, TokenSchema } from '../schemas/Token'
import { UserModel } from '../schemas/User/UserSchema'
import { ApolloError } from 'apollo-server-errors';

dotenv.config()
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, REDIS_URL } = process.env

export class TokenService {
  private jwtr

  constructor() {
    this.jwtr = new JWTR(createClient({ url: REDIS_URL }))
  }

  async generate(payload: object) {
    const access = await this.jwtr.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '30m' })
    const refresh = await jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' })

    return { access, refresh }
  }

  async checkAccess(token?: string) {
    return token && Boolean(await this.jwtr.verify(token, JWT_ACCESS_SECRET))
  }

  async checkRefresh(token?: string) {
    if (token) {
      const isExist = Boolean(await TokenModel.findOne({ token }))
      const isValid = Boolean(await jwt.verify(token, JWT_REFRESH_SECRET))
      return isExist && isValid
    }

    return false
  }

  decodeAccess(token?: string) {
    return token && jwt.decode(token)
  }

  decodeRefresh(token?: string) {
    return token && this.jwtr.decode<JwtPayload>(token)
  }

  async save(token: string, _id: ObjectId, ip: string, ids?: Ref<TokenSchema>[]) { // TODO: refactor to object
    const user = await UserModel.findOne({ _id })

    if (!user) {
      throw new ApolloError('Произошла какая-то ошибка. Попробуйте ещё раз')
    }

    if (ids?.length) {
      let models = await TokenModel.find({ _id: { $in: ids } })

      models = models.filter(async (model) => {
        let isValid

        try {
          isValid = Boolean(await jwt.verify(model.token, JWT_REFRESH_SECRET))
        } catch (error) {
          await TokenModel.deleteOne({ _id: model._id })
        }

        return isValid
      })

      const currentIpModel = models.find(model => {
        const payload = this.decodeRefresh(model.token)

        return payload && payload.ip === ip
      })

      if (currentIpModel) {
        models = models.filter(model => model._id !== currentIpModel._id)

        await TokenModel.deleteOne({ _id: currentIpModel._id })
      }

      if (models.length > 5) {
        const oldest = models.reduce((aModel, bModel) => {
          const aPayload = this.decodeRefresh(aModel.token)
          const bPayload = this.decodeRefresh(bModel.token)

          if (aPayload && bPayload && aPayload.exp && bPayload.exp) {
            return aPayload.exp < bPayload.exp ? aModel : bModel
          }

          return bModel
        })

        models = models.filter(model => model._id !== oldest._id)

        user.tokenIDs = models.map(model => model._id)

        await TokenModel.deleteOne({ _id: oldest._id })
      }
    }

    const input: TokenInput = {
      token,
    }

    await TokenModel.create(input)

    const tokenModel = await TokenModel.findOne({ token })
    if (tokenModel) {
      user.tokenIDs ? user.tokenIDs.push(tokenModel._id) : [tokenModel._id]
    }

    user.save()
  }

  async find(_id: Ref<TokenSchema>) {
    return await TokenModel.findOne({ _id })
  }

  async delete(access?: string, refresh?: string) {
    access && await this.jwtr.destroy(access)
    refresh && await TokenModel.deleteOne({ token: refresh })
  } 
}
