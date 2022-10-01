const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");

const FLIGHTS_DATA = [
  {
    id: 101,
    origin: "Portland",
    destination: "Halifax",
  },
  {
    id: 102,
    origin: "San Francisco",
    destination: "Orlando",
  },
  {
    id: 103,
    origin: "Halifax",
    destination: "Orlando",
  },
];

function flightsByDestination(destination) {
  return FLIGHTS_DATA.filter((flight) => flight.destination === destination);
}

function getFlight(id) {
  return FLIGHTS_DATA.find((flight) => flight.id === +id);
}

const typeDefs = gql`
  extend schema
    @link(
      url: "https://specs.apollo.dev/federation/v2.0"
      import: ["@key", "@shareable"]
    )

  type Flight @key(fields: "id") {
    id: ID!
    origin: String
    destination: String
  }
  type Query {
    flightsByDestination(destination: String!): [Flight]
  }
`;

const resolvers = {
  Query: {
    flightsByDestination: (root, { destination }) =>
      flightsByDestination(destination),
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

// The `listen` method launches a web server.
server.listen(4002).then(({ url }) => {
  console.log(`🚀 Flight Operations Service ready at ${url}`);
});
