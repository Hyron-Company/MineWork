import { ObjectId } from 'mongoose'
import { Field, ObjectType } from 'type-graphql'
import { Typegoose } from 'typegoose'

@ObjectType()
export class SubjectSchema extends Typegoose {
  @Field(() => String)
  readonly _id!: ObjectId
}

export const SubjectModel = new SubjectSchema().getModelForClass<typeof SubjectSchema>(SubjectSchema)
