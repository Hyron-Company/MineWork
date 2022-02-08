import 'reflect-metadata'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import express, { Application } from 'express'
import https, { ServerOptions } from 'https'
import mongoose, { ConnectOptions } from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import router from './utils/router'
import { authChecker } from './utils/middlewares/authChecker'

dotenv.config()
const { PORT, MONGODB_URI, COOKIE_SECRET, HTTPS_PRIVATE_KEY, HTTPS_CERTIFICATE } = process.env
const app: Application = express()
const mongoConnectOptions = { useNewUrlParser: true } as ConnectOptions
const serverOptions: ServerOptions = { key: HTTPS_PRIVATE_KEY, cert: HTTPS_CERTIFICATE }

app.use(router)
app.use(cors())
app.use(cookieParser(COOKIE_SECRET))
app.set('trust proxy', true)

;(async () => {
  try {
    const schema = await buildSchema({
      resolvers: [__dirname + '/resolvers/**/*.ts'],
      authChecker
    })

    const apolloServer = new ApolloServer({ schema, context: ctx => ctx });

    await apolloServer.start()
    console.log('🟣 Apollo server has been started')

    await mongoose.connect(MONGODB_URI, mongoConnectOptions)
    console.log('💾 MongoDB has been connected')

    apolloServer.applyMiddleware({ app, path: '/gql' })

    const httpsServer = https.createServer(serverOptions, app)
    httpsServer.listen({ port: PORT }, () => console.log(`🚀 Server has been started on port: ${PORT}...`))
  } catch (err) {
    console.log(`❌ Error: \n ${err}`)
  }
})()
