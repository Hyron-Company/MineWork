import { ExpressContext } from 'apollo-server-express'
import { MutationActivateArgs, MutationRegistrationArgs, ResolversParentTypes } from '../graphql/resolvers'
import UserService from '../services/user-service'

class UserController {
  registration = (
    parent: ResolversParentTypes,
    { input }: MutationRegistrationArgs,
    { res }: ExpressContext
  ) => {
    return UserService.registration({ input })
  }

  activate = (parent: ResolversParentTypes, { activationCode }: MutationActivateArgs) => {
    return UserService.activate(activationCode!)
  }
}

export default new UserController()
