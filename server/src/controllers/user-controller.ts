import { IUserSchema } from './../graphql/models.d';
import { ExpressContext } from 'apollo-server-express'
import {
  MutationActivateArgs,
  MutationLoginArgs,
  MutationRegistrationArgs,
  ResolversParentTypes
} from '../graphql/resolvers'
import UserService from '../services/user-service'

export default class UserController {
  static async registration(parent: ResolversParentTypes, { input }: MutationRegistrationArgs, { res }: ExpressContext) : Promise<IUserSchema> {
    return await UserService.registration({ input })
  }

  static async activate(parent: ResolversParentTypes, { activationCode }: MutationActivateArgs) : Promise<void> {
    return await UserService.activate(activationCode!)
  }

  static async login(parent: ResolversParentTypes, { login, password }: MutationLoginArgs) : Promise<void> {
    return await UserService.login({ login, password })
  }

  constructor() {return }
}
