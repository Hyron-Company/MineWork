import { Field, InputType } from 'type-graphql'
import { Typegoose } from 'typegoose'
import { MaxLength, MinLength } from 'class-validator'

@InputType()
export class LoginInput extends Typegoose {
  @Field()
  login!: string

  @MinLength(6, { message: 'Пароль слишком короткий' })
  @MaxLength(50, { message: 'Пароль слишком длинный' })
  @Field()
  password!: string
}
