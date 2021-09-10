import dotenv from 'dotenv'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import { apollo } from './src/graphql'

dotenv.config()

const { PORT, MONGODB_URI } = process.env

const app: Application = express()

const mongoConnectOptions = {
  useNewUrlParser: true
} as ConnectOptions

app.use(cors())

const start = async () => {
  await mongoose.connect(MONGODB_URI as string, mongoConnectOptions)
  console.log('💾 MongoDB has been connected')

  await apollo.start()
  console.log('🟣 Apollo server has been started')

  try {
    app.get('/', (req: Request, res: Response) => res.send('GraphQL API'))

    apollo.applyMiddleware({ app, path: '/gql' })

    app.listen({ port: PORT }, () => console.log(`🚀 Server has been started on port: ${PORT}...`))
  } catch (err) {
    console.log(`❌ Error: \n ${err}`)
  }
}

;(async () => await start())()
