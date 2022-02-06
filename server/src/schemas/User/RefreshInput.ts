import { Field, InputType } from 'type-graphql'
import { Typegoose } from 'typegoose'
import { ObjectId } from 'mongoose'

@InputType()
export class RefreshInput extends Typegoose {
  @Field(() => String)
  _id!: ObjectId
}
