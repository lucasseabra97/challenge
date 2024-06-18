import { createSchema } from 'graphql-yoga'
// import { typeDef as User, resolvers as userResolvers } from './models/user.js'
// import { typeDef as Comment, resolvers as commentResolvers } from './models/comments.js'
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
//   typeDefs: [queries, User, Comment],
typeDefs: [queries],
//   resolvers: _.merge(resolvers, userResolvers, commentResolvers)
resolvers
})