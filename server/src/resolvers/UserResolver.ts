import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { UserSchema, LoginInput, RegisterInput, LogoutInput } from '../schemas/User'
import { UserService } from '../services/UserService'

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

  @Mutation(() => UserSchema)
  async logout(@Arg('input') input: LogoutInput) {
    return await this.userService.logout(input)
  }

  @Query(() => String)
  async getUser() {
    return 'user'
  }
}