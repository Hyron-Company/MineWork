import dotenv from 'dotenv'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import { apollo } from './src/graphql'
import cookieParser from 'cookie-parser'

dotenv.config()

const { PORT, MONGODB_URI } = process.env

const app: Application = express()

const mongoConnectOptions = {
  useNewUrlParser: true
} as ConnectOptions

app.use(cors())
app.use(cookieParser())

const start = async () => {
  await mongoose.connect(MONGODB_URI as string, mongoConnectOptions)
  console.log('💾 MongoDB has been connected')

  await apollo.start()
  console.log('🟣 Apollo server has been started')

  try {
    app.get('/', (_request: Request, response: Response) => response.send('GraphQL API'))

    apollo.applyMiddleware({ app, path: '/gql' })

    app.listen({ port: PORT }, () => console.log(`🚀 Server has been started on port: ${PORT}...`))
  } catch (error) {
    console.log(`❌ Error: \n ${error}`)
  }
}

;(async () => await start())()
