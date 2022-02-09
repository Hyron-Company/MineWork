import { Field, InputType } from 'type-graphql'
import { Typegoose } from 'typegoose'
import { IsEmail } from 'class-validator'

@InputType()
export class SendActivationMailInput extends Typegoose {
  @IsEmail()
  @Field()
  email!: string
}
