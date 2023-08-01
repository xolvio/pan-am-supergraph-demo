const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { readFileSync } = require("fs");

const FLIGHTS_DATA = [
  {
    id: 101,
    discount: 20,
  },
  {
    id: 102,
    discount: 10,
  },
  {
    id: 103,
    discount: 0,
  },
];

function getFlight(id) {
  return FLIGHTS_DATA.find((flight) => flight.id === +id);
}

const schemaString = readFileSync(require.resolve("./schema.graphql")).toString(
  "utf-8"
);

const typeDefs = gql`
  ${schemaString}
`;

const resolvers = {
  Query: {
    flight: (root, { id }) => getFlight(id),
  },
  Flight: {
    __resolveReference(flight) {
      return getFlight(flight.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  }),
});

server.listen({ port: process.env.PORT || 4003 }).then(({ url }) => {
  console.log(`🚀 Reservations Service ready at ${url}`);
});
