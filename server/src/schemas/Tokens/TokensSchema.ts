import { Field, ObjectType } from 'type-graphql'
import { Typegoose } from 'typegoose'
import { propField } from '../../utils/decorators/propField'

@ObjectType()
export class TokensSchema extends Typegoose {
  @Field()
  readonly _id!: string

  @propField({ required: true })
  ip!: string

  @propField({ required: true })
  token!: string
}

export const TokensModel = new TokensSchema().getModelForClass<typeof TokensSchema>(TokensSchema)
