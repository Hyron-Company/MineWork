import { ExpressContext } from 'apollo-server-express'
import { Context } from '../types/Context'

export const parseContext = (ctx: ExpressContext): Context => ({ ip: ctx.req.ip, cookies: ctx.req.cookies, headers: ctx.req.headers })