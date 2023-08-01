const { ApolloServer } = require('apollo-server');
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'flight', url: 'http://localhost:4001' },
      { name: 'passenger', url: 'http://localhost:4002' },
      { name: 'booking', url: 'http://localhost:4003' },
    ],
  }),
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: ({ req }) => {
    // If needed, pass some context here
    return {};
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Supergraph Gateway ready at ${url}`);
});
