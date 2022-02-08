import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { ExpressContext } from 'apollo-server-express'
import { LoginInput, RegisterInput } from '../schemas/User'
import { UserService } from '../services/UserService'
import { SendActivationMailInput } from '../schemas/User/SendActivationMailInput'

@Resolver()
export default class UserResolver {
  private userService

  constructor() {
    this.userService = new UserService()
  }

  @Mutation(() => String)
  async register(@Arg('input') input: RegisterInput) {
    return await this.userService.register(input)
  }

  @Mutation(() => String)
  async login(@Arg('input') input: LoginInput, @Ctx() context: ExpressContext) {
    return await this.userService.login(input, context)
  }

  @Authorized()
  @Mutation(() => String)
  async logout(@Ctx() context: ExpressContext) {
    return await this.userService.logout(context)
  }

  @Authorized()
  @Mutation(() => String)
  async refresh(@Ctx() context: ExpressContext) {
    return await this.userService.refresh(context)
  }

  @Mutation(() => String)
  async sendActivationMail(@Arg('input') input: SendActivationMailInput) {
    return await this.userService.sendActivationMail(input)
  }

  @Authorized()
  @Query(() => String)
  async getUser() {
    return 'user'
  }
}
