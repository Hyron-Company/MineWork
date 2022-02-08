import { Field, ObjectType } from 'type-graphql'
import { Typegoose, Ref, prop, pre } from 'typegoose'
import bcrypt from 'bcrypt'
import { propField } from '../../utils/decorators/propField'
import { Role } from '../../types/enums/Role'
import { PersonSchema } from '../Person/PersonSchema'
import { TokenSchema } from '../Token/TokenSchema'
import { SubjectSchema } from '../Subject/SubjectSchema'
import { ObjectId } from 'mongoose'

@pre<UserSchema>('save', async function () {
  if (this!.isModified('password')) this.password = await bcrypt.hash(this.password, 10)
})
@ObjectType()
export class UserSchema extends Typegoose {
  @Field(() => String)
  readonly _id!: ObjectId

  @propField({ required: true })
  nickname!: string

  @propField()
  email!: string

  @propField({}, () => String, { nullable: true })
  phoneNumber?: string

  @prop({ required: true })
  password!: string

  @prop({ default: false })
  confirmed!: boolean

  @prop()
  code!: string

  @propField({ enum: Role }, () => Role, { defaultValue: Role.USER })
  role!: string

  @Field()
  accessToken!: string

  @propField({ ref: () => PersonSchema }, () => String, { nullable: true })
  personID?: Ref<PersonSchema>

  @prop({ ref: () => [TokenSchema] })
  tokenIDs?: Ref<TokenSchema>[]

  @propField({ ref: () => SubjectSchema }, () => String, { nullable: true })
  subjectID?: Ref<SubjectSchema>
}

export const UserModel = new UserSchema().getModelForClass<typeof UserSchema>(UserSchema)
