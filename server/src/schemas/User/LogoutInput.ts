import { Field, InputType } from 'type-graphql'
import { Typegoose } from 'typegoose'

@InputType()
export class LogoutInput extends Typegoose {
  @Field()
  _id!: string
}
