require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { userTypeDefs, userResolvers } = require("./schemas/user");

const {
  mainEntityTypeDefs,
  mainEntityResolvers,
} = require("./schemas/mainEntity");

(async () => {
  const server = new ApolloServer({
    typeDefs: [mainEntityTypeDefs, userTypeDefs],
    resolvers: [mainEntityResolvers, userResolvers],
    introspection: true,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
