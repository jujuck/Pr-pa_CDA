import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { dataSource } from "./database/client";
import RepoResolver from './repo/Repo.resolvers';
import { buildSchema } from 'type-graphql';
import StatusResolver from './status/Status.resolvers';
import LangResolver from './lang/Lang.resolvers';

(async () =>  {

// const typeDefs = `#graphql
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Repo" type defines the queryable fields for every book in our data source.
//   type Repo {
//     id: String
//     name: String
//     url: String
//   }


//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     repos: [Repo]
//   }
// `;


// const resolvers = {
//   Query: {
//     repos: () => repos,
//   },
// };
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [RepoResolver, StatusResolver, LangResolver]
  })

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);

})();