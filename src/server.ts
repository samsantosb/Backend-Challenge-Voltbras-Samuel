import { ApolloServer, gql } from "apollo-server";

// Tipos do GraphQL
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Resolvers
const resolvers = {
  Query: {
    hello: () => "Hello, world!",
  },
};

// Inicializando o Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Iniciar o servidor
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
