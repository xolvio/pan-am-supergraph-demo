const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { readFileSync } = require("fs");

const FLIGHTS_DATA = [
  {
    id: 101,
    origin: "Portland",
    destination: "Halifax",
    year: 2021,
    miles: 1000,
    numHoursDelayed: 1,
  },
  {
    id: 102,
    origin: "San Francisco",
    destination: "Orlando",
    year: 2022,
    miles: 2000,
    numHoursDelayed: 3,
  },
  {
    id: 103,
    origin: "Halifax",
    destination: "Orlando",
    year: 2022,
    miles: 3000,
    numHoursDelayed: 5,
  },
];

function flightsByDestination(destination) {
  return FLIGHTS_DATA.filter((flight) => flight.destination === destination);
}

function delayedFlights(hoursDelayed) {
  return FLIGHTS_DATA.filter(
    (flight) => flight.numHoursDelayed >= +hoursDelayed
  );
}

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
    flightsByDestination: (root, { destination }) =>
      flightsByDestination(destination),
    delayedFlights: (root, { hoursDelayed }) => delayedFlights(hoursDelayed),
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

server.listen({ port: process.env.PORT || 4002 }).then(({ url }) => {
  console.log(`🚀 Flight Operations Service ready at ${url}`);
});
