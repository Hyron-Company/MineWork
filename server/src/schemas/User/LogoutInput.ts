import { Field, InputType } from 'type-graphql'
import { Typegoose, Ref } from 'typegoose'
import { TokensSchema } from '../Tokens/TokensSchema'

@InputType()
export class LogoutInput extends Typegoose {
  @Field()
  _id!: string

  @Field(() => [String])
  tokensID?: [Ref<TokensSchema>]
}
