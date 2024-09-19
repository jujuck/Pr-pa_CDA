import "reflect-metadata";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { dataSource } from "./database/client";
import { buildSchema } from 'type-graphql';
// import jwt from "jsonwebtoken";

import RepoResolver from './repo/Repo.resolvers';
import StatusResolver from './status/Status.resolvers';
import LangResolver from './lang/Lang.resolvers';
import CommentResolver from "./comment/Comment.resolvers";
import UserResolver from './user/User.resolvers';

interface Context {
  email?: string;
  role?: string;
  res: any;
}

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
    resolvers: [RepoResolver, StatusResolver, LangResolver, CommentResolver, UserResolver],
    authChecker: ({ context }: { context: Context }, roles) => {
      console.log("roles for this query/mutation ", roles);
      // Check user
      if (!context.email) {
        // No user, restrict access
        return false;
      }

      // Check '@Authorized()'
      if (roles.length === 0) {
        // Only authentication required
        return true;
      }

      // Check '@Authorized(...)' roles inclues the role of user
      if (roles.includes(context.role)) {
        return true;
      } else {
        return false;
      }
    },
  })

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ res }) => {
      // if (process.env.JWT_SECRET_KEY === undefined) {
      //   throw new Error("NO JWT SECRET KEY CONFIGURED");
      // }


      // if (req.headers.cookie.token && req.headers.cookie.token.value) {
      //   const payload = jwt.verify(
      //     cookies.token.value,
      //     process.env.JWT_SECRET_KEY
      //   ) as {};
      //   if (payload) {
      //     return { ...payload, res: res };
      //   }
      // }
      return { res: res };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);

})();