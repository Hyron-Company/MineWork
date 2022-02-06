import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { UserSchema, LoginInput, RegisterInput, RefreshInput } from '../schemas/User'
import { UserService } from '../services/UserService'
import { SendActivationMailInput } from '../schemas/User/SendActivationMailInput'
import { Context } from '../types/Context'

@Resolver()
export default class UserResolver {
  private userService

  constructor() {
    this.userService = new UserService()
  }

  @Mutation(() => String)
  async register(@Arg('input') input: RegisterInput, @Ctx() context: Context) {
    return await this.userService.register(input, context)
  }

  @Mutation(() => UserSchema)
  async login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
    return await this.userService.login(input, context)
  }

  @Mutation(() => String)
  async logout(@Ctx() context: Context) {
    return await this.userService.logout(context)
  }

  @Mutation(() => String)
  async refresh(@Arg('input') input: RefreshInput, @Ctx() context: Context) {
    return await this.userService.refresh(input, context)
  }

  @Mutation(() => String)
  async sendActivationMail(@Arg('input') input: SendActivationMailInput) {
    return await this.userService.sendActivationMail(input)
  }

  @Query(() => String)
  async getUser() {
    return 'user'
  }
}
