import { ExpressContext } from 'apollo-server-express'
import { MutationActivateArgs, MutationRegistrationArgs, ResolversParentTypes } from '../graphql/resolvers'
import UserService from '../services/user-service'

class UserController {
  registration = (
    parent: ResolversParentTypes,
    { email, password }: MutationRegistrationArgs,
    { res }: ExpressContext
  ) => {
    return UserService.registration({ email, password })
  }

  activate = (parent: ResolversParentTypes, { activationCode }: MutationActivateArgs) => {
    return UserService.activate(activationCode!)
  }
}

export default new UserController()
