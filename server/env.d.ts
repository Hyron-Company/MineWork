export interface Env {
  PORT: string
  SERVER_URL: string
  CLIENT_URL: string
  REDIS_URL?: string
  MONGODB_URI: string
  MODE: string
  JWT_ACCESS_SECRET: string
  JWT_REFRESH_SECRET: string
  TOTP_SECRET: string
  COOKIE_SECRET: string
  HTTPS_PRIVATE_KEY: string
  HTTPS_CERTIFICATE: string
  SMTP_HOST: string
  SMTP_PORT: string
  SMTP_USER: string
  SMTP_PASSWORD: string
}

export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
