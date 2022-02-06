import { AuthChecker } from "type-graphql"
import { Context } from '../../types/Context'
import { TokenService } from '../../services/TokenService'

const tokenService = new TokenService()

export const authChecker: AuthChecker<Context> = async ({ context }) => Boolean(await tokenService.checkAccess(context.headers.authorization))
