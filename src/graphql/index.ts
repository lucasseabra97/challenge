import { createSchema } from 'graphql-yoga'
import { typeDef as Item, resolvers as itemResolvers } from './models/item.js'
import _ from 'loadsh';

const queries = /* GraphQL */ `
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'world',
  },
}

export const schema = createSchema({
  typeDefs: [queries, Item],
  resolvers: _.merge(resolvers, itemResolvers)
})