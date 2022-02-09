import { ObjectId } from 'mongoose'
import { prop, Typegoose } from 'typegoose'

export class TokenSchema extends Typegoose {
  readonly _id!: ObjectId

  @prop({ required: true })
  token!: string
}

export const TokenModel = new TokenSchema().getModelForClass<typeof TokenSchema>(TokenSchema)

export type TokenInput = Pick<TokenSchema, 'token'>
