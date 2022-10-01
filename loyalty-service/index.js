const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");

const FLIGHTS_DATA = [
  {
    id: 101,
    loyaltyAccounts: [201, 202],
    year: 2021,
    miles: 1000,
  },
  {
    id: 102,
    loyaltyAccounts: [202, 203],
    year: 2022,
    miles: 2000,
  },
  {
    id: 103,
    loyaltyAccounts: [201, 203],
    year: 2022,
    miles: 3000,
  },
];

const LOYALTY_ACCOUNTS_DATA = [
  {
    id: 201,
    loyaltyStatus: "Gold",
  },
  {
    id: 202,
    loyaltyStatus: "Silver",
  },
  {
    id: 203,
    loyaltyStatus: "Bronze",
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
    loyaltyAccounts: [LoyaltyAccount]
    year: Int
    miles: Int
  }

  type MilesAccumulated {
    loyaltyAccountId: ID!
    miles: Int!
    year: Int
  }

  type LoyaltyAccount {
    id: ID!
    loyaltyStatus: String
  }

  type Query {
    loyaltyAccount(id: ID!): LoyaltyAccount
    milesAccumulatedPerCalendarYear(
      loyaltyAccountId: ID!
      year: Int!
    ): MilesAccumulated
    loyaltyAccountsByFlight(flightId: ID!): [LoyaltyAccount]
  }
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
server.listen(4001).then(({ url }) => {
  console.log(`🚀 Loyalty Service ready at ${url}`);
});
