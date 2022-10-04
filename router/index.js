const { ApolloServer, gql } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');
const { readFileSync } = require('fs');

const supergraphSdl = readFileSync('./supergraph.graphql').toString();

// Initialize an ApolloGateway instance and pass it
// the supergraph schema as a string
const gateway = new ApolloGateway({
  supergraphSdl,
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  introspection: true,
  gateway,
});

server.listen({ port: process.env.PORT || 4004 }).then(({ url }) => {
  console.log(`🚀 Pan Am Supergraph Gateway ready at ${url}`);
});