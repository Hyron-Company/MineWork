import { Field, ObjectType } from 'type-graphql'
import { Typegoose } from 'typegoose'
import { propField } from '../../utils/decorators/propField'

@ObjectType()
export class TokenSchema extends Typegoose {
  @Field()
  readonly _id!: string

  @propField({ required: true })
  ip!: string

  @propField({ required: true })
  token!: string

  @propField({ required: true }, ()=> Date)
  createdAt!: Date
}

export const TokenModel = new TokenSchema().getModelForClass<typeof TokenSchema>(TokenSchema)
