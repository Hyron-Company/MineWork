import { Field, ObjectType } from 'type-graphql'
import { Typegoose } from 'typegoose'

@ObjectType()
export class SubjectSchema extends Typegoose {
  @Field()
  readonly _id!: string
}

export const SubjectModel = new SubjectSchema().getModelForClass<typeof SubjectSchema>(SubjectSchema)
