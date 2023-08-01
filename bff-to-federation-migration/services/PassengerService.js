const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = gql`
  # Opt in to Federation 2
  extend schema
  @link(
    url: "https://specs.apollo.dev/federation/v2.3"
    import: [
      "@key"
    ]
  )

  type Passenger @key(fields: "passengerId") {
    passengerId: ID!
    bagsAllowed: Int
    passengerType: String
    accountCredits: Int
  }

  type Flight @key(fields: "flightId") {
    flightId: ID!
  }
`;

const resolvers = {
  Passenger: {
    bagsAllowed(passenger) {
      // Implement your logic to determine the number of bags allowed for the passenger
    },
    passengerType(passenger) {
      // Implement your logic to determine the passenger type (e.g., adult, child, etc.)
    },
    accountCredits(passenger) {
      // Implement your logic to fetch the account credits for the passenger
    },
    __resolveReference(reference, { dataSources }) {
      return dataSources.passengersAPI.getPassengerById(reference.passengerId);
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`Passenger service ready at ${url}`);
});
