import { HelloResolvers } from '../resolvers'
import getAllHello from '../services/Hello'

const helloResolver: HelloResolvers = {
  Query: {
    hello: getAllHello
  }
}

export default helloResolver
