const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { readFileSync } = require("fs");

const FLIGHTS_DATA = [
  {
    id: 101,
    loyaltyAccounts: [201, 202],
  },
  {
    id: 102,
    loyaltyAccounts: [202, 203],
  },
  {
    id: 103,
    loyaltyAccounts: [201, 203],
  },
];

const LOYALTY_ACCOUNTS_DATA = [
  {
    id: 201,
    loyaltyStatus: "Gold",
    name: "Curly",
  },
  {
    id: 202,
    loyaltyStatus: "Silver",
    name: "Moe",
  },
  {
    id: 203,
    loyaltyStatus: "Bronze",
    name: "Larry",
  },
];

function getLoyaltyAccount(id) {
  return LOYALTY_ACCOUNTS_DATA.find((account) => account.id === +id);
}

function getMilesAccumulatedPerCalendarYear(loyaltyAccountId, year) {
  const miles = FLIGHTS_DATA.filter(
    (flight) =>
      flight.loyaltyAccounts.includes(+loyaltyAccountId) && flight.year === year
  ).reduce((acc, flight) => acc + flight.miles, 0);
  return {
    loyaltyAccountId,
    miles,
    year,
  };
}

function getLoyaltyAccountsByFlight(flightId) {
  const accounts = FLIGHTS_DATA.find(
    (flight) => flight.id === +flightId
  ).loyaltyAccounts;
  return LOYALTY_ACCOUNTS_DATA.filter((account) =>
    accounts.includes(account.id)
  );
}

function getLoyaltyAccountsByDestination(args, context) {
  console.log(JSON.stringify(args));
  console.log(JSON.stringify(context));
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
    loyaltyAccount: (root, { id }) => getLoyaltyAccount(id),
    milesAccumulatedPerCalendarYear: (root, { loyaltyAccountId, year }) =>
      getMilesAccumulatedPerCalendarYear(loyaltyAccountId, year),
    loyaltyAccountsByFlight: (root, { flightId }) =>
      getLoyaltyAccountsByFlight(flightId),
  },
  Flight: {
    __resolveReference(flight) {
      flight.loyaltyAccounts = getFlight(flight.id).loyaltyAccounts.map((id) =>
        getLoyaltyAccount(id)
      );
      return flight;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  }),
});

server.listen({ port: process.env.PORT || 4001 }).then(({ url }) => {
  console.log(`🚀 Loyalty Service ready at ${url}`);
});
