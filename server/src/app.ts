import 'reflect-metadata'
import dotenv from 'dotenv'
import cors from 'cors'
import express, { Application, Request, Response, NextFunction } from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import router from './utils/router'

dotenv.config()

const { PORT, MONGODB_URI } = process.env

const app: Application = express()

const mongoConnectOptions = {
  useNewUrlParser: true
} as ConnectOptions
const loggingMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  console.log('ip:', req.ip);
  next();
}

app.use(loggingMiddleware)
app.use(router)
app.use(cors())
app.set('trust proxy', true)

const start = async () => {
  try {
    const schema = await buildSchema({
      resolvers: [__dirname + "/resolvers/**/*.ts"]
    });

    const apolloServer = new ApolloServer({ schema });

    await apolloServer.start()
    console.log('🟣 Apollo server has been started')

    await mongoose.connect(MONGODB_URI as string, mongoConnectOptions)
    console.log('💾 MongoDB has been connected')

    apolloServer.applyMiddleware({ app, path: '/gql' })

    app.listen({ port: PORT }, () => console.log(`🚀 Server has been started on port: ${PORT}...`))
  } catch (err) {
    console.log(`❌ Error: \n ${err}`)
  }
}

;(async () => await start())()
