import { AuthChecker } from 'type-graphql'
import { ExpressContext } from 'apollo-server-express'
import { TokenService } from '../../services/TokenService'

const tokenService = new TokenService()

export const authChecker: AuthChecker<ExpressContext> = async ({ context }) => Boolean(await tokenService.checkAccess(context.req.headers.authorization))
