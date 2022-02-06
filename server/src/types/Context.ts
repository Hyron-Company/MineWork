import { IncomingHttpHeaders } from 'http'

interface Cookies {
  token?: string
}

export interface Context {
  ip: string
  cookies: Cookies
  headers: IncomingHttpHeaders
}