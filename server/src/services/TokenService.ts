import jwt from 'jsonwebtoken'
import { TokenInput, TokenModel } from '../schemas/Token'

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env

export class TokenService {
  generate(payload: string | object | Buffer) {
    const access = jwt.sign(payload, JWT_ACCESS_SECRET as string, { expiresIn: '30m' })
    const refresh = jwt.sign(payload, JWT_REFRESH_SECRET as string, { expiresIn: '30d' })

    return { access, refresh }
  }

  async save (ids: string[], input: TokenInput) {
    let models = await TokenModel.find({ _id: { $in: ids } })

    models = models.filter(async (model) => {
      let isValid

      try {
        isValid = !!jwt.verify(model.token, JWT_REFRESH_SECRET as string)
      } catch (error) {
        await TokenModel.deleteOne({ _id: model._id })
      }

      return !!isValid
    })

    if (models.length > 5) {
      const oldest = models.reduce((a, b) => a.createdAt < b.createdAt ? a : b)
      await TokenModel.deleteOne({ _id: oldest._id })
    }

    await TokenModel.create(input)
  }

  async delete(_id: string) {
    await TokenModel.deleteOne({ _id })
  } 
}
