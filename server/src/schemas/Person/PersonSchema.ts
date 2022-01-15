import { Field, ObjectType } from 'type-graphql'
import { Typegoose } from 'typegoose'
import { propField } from '../../utils/decorators/propField'

@ObjectType()
export class PersonSchema extends Typegoose {
  @Field()
  readonly _id!: string

  @propField()
  name?: string

  @propField()
  surname?: string

  @propField({}, () => [String])
  avatars?: string[]

  @propField({}, () => Date)
  dateOfBirth?: Date
}

export const PersonModel = new PersonSchema().getModelForClass<typeof PersonSchema>(PersonSchema)
