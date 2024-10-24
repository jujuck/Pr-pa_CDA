import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./database/client";
import * as winston from "winston";
import { buildSchema } from "type-graphql";
import { GraphQLError } from "graphql";
import RepoResolver from "./repo/Repo.resolvers";
import StatusResolver from "./status/Status.resolvers";
import LangResolver from "./lang/Lang.resolvers";
import CommentResolver from "./comment/Comment.resolvers";

// Configuration de Winston pour logger dans un fichier
const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.File({ filename: "logs/error.log" })],
});

(async () => {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [RepoResolver, StatusResolver, LangResolver, CommentResolver],
  });

  const server = new ApolloServer({
    schema,
    formatError: (formattedError: unknown) => {
      const err = formattedError as GraphQLError;
      // Ne renvoyer aucune stack trace, path, ou locations

      if (process.env.NODE_ENV !== "production") {
        logger.error({
          message: err.message,
          path: err.path,
          locations: err.locations,
          extensions: err.extensions,
        });
      } else {
        console.error("Une erreur est survenue", err);
      }

      return {
        message:
          err.message ||
          "Une erreur indéfinie est survenue, notre équipe technique est déjà en train de travailler à une correction",
        code: err.extensions?.code || "INTERNAL_SERVER_ERROR",
      };
    },
    // Désactiver la trace complète des erreurs
    introspection: process.env.NODE_ENV !== "production",
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
  });

  console.info(`🚀  Server ready at: ${url}`);
})();
