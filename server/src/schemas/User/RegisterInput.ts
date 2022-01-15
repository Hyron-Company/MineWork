import { Field, InputType } from 'type-graphql'
import { Typegoose } from 'typegoose'
import { IsEmail, MaxLength, MinLength } from 'class-validator'

@InputType()
export class RegisterInput extends Typegoose {
  @Field()
  nickname!: string

  @IsEmail()
  @Field()
  email!: string

  // TODO: Add auth by  PhoneNumber

  @MinLength(6, { message: 'Пароль слишком короткий' })
  @MaxLength(50, { message: 'Пароль слишком длинный' })
  @Field()
  password!: string
}
