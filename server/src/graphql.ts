import { addResolversToSchema, GraphQLFileLoader, loadFilesSync, loadSchemaSync, mergeResolvers } from 'graphql-tools'
import depthLimit from 'graphql-depth-limit'
import { ApolloServer } from 'apollo-server-express'

const buildGraphQLSchema = (pathToTypes: string, pathToResolvers: string) => {
  const schema = loadSchemaSync(pathToTypes, {
    loaders: [new GraphQLFileLoader()]
  })

  const resolvers = loadFilesSync(pathToResolvers)
  return addResolversToSchema({
    schema,
    resolvers: mergeResolvers(resolvers)
  })
}

const gqlSchema = buildGraphQLSchema('./src/graphql/schema/schema.gql', './src/graphql/resolvers') // path from app.ts

export const apollo = new ApolloServer({
  schema: gqlSchema,
  validationRules: [depthLimit(10)]
})
