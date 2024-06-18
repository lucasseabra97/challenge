import express from 'express';
import { createYoga } from 'graphql-yoga';
import { schema } from './graphql/index.js';

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({ schema })

const app = express()
app.use("/graphql", yoga)

// Start the server at port
app.listen(8000)
console.log("Running a GraphQL API server at http://localhost:8000/graphql")