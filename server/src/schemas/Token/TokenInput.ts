import { Field, InputType } from 'type-graphql'
import { Typegoose } from 'typegoose'

@InputType()
export class TokenInput extends Typegoose {
  @Field()
  ip!: string

  @Field()
  token!: string

  @Field(()=> Date)
  createdAt!: Date
}
