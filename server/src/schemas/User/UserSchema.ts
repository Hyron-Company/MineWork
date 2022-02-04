import { Field, ObjectType } from 'type-graphql'
import { Typegoose, Ref, prop, pre } from 'typegoose'
import bcrypt from 'bcrypt'
import { propField } from '../../utils/decorators/propField'
import { RoleEnum } from './RoleEnum'
import { PersonSchema } from '../Person/PersonSchema'
import { TokenSchema } from '../Token/TokenSchema'
import { SubjectSchema } from '../Subject/SubjectSchema'

@pre<UserSchema>("save", async function () {
  if (this!.isModified('password')) this.password = await bcrypt.hash(this.password, 10)
})
@ObjectType()
export class UserSchema extends Typegoose {
  @Field()
  readonly _id!: string

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

  @propField({ enum: RoleEnum }, () => RoleEnum, { defaultValue: RoleEnum.USER })
  role!: string

  @propField({ ref: () => PersonSchema }, () => String, { nullable: true })
  personID?: Ref<PersonSchema>

  @prop({ ref: () => [TokenSchema] })
  tokensID?: [Ref<TokenSchema>]

  @propField({ ref: () => SubjectSchema }, () => String, { nullable: true })
  subjectID?: Ref<SubjectSchema>
}

export const UserModel = new UserSchema().getModelForClass<typeof UserSchema>(UserSchema)
