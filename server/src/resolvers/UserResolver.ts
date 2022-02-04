import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { UserSchema, LoginInput, RegisterInput, LogoutInput } from '../schemas/User'
import { UserService } from '../services/UserService'
import { SendActivationMailInput } from '../schemas/User/SendActivationMailInput';

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => String)
  async register(@Arg('input') input: RegisterInput) {
    return await this.userService.register(input)
  }

  @Mutation(() => UserSchema)
  async login(@Arg('input') input: LoginInput) {
    return await this.userService.login(input)
  }

  @Mutation(() => String)
  async logout(@Arg('input') input: LogoutInput) {
    return await this.userService.logout(input)
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