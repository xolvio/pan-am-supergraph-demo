const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");

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

const typeDefs = gql`
  extend schema
    @link(
      url: "https://specs.apollo.dev/federation/v2.0"
      import: ["@key", "@shareable"]
    )

  type Flight @key(fields: "id") {
    id: ID!
    discount: Int
  }
  type Query {
    flight(id: ID!): Flight
  }
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

// The `listen` method launches a web server.
server.listen(4003).then(({ url }) => {
  console.log(`🚀 Reservations Service ready at ${url}`);
});
