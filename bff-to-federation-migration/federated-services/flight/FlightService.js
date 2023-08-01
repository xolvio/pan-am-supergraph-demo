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

  type Flight @key(fields: "flightId") {
    flightId: ID!
    passengers: [Passenger]
    canAcceptMoreBags: Boolean
    hasAvailableSeats: Boolean
  }

  type Passenger @key(fields: "passengerId") {
    passengerId: ID!
  }
`;

const resolvers = {
  Flight: {
    passengers(flight, _, { dataSources }) {
      return flight.passengerIds.map((passengerId) =>
        dataSources.passengersAPI.getPassengerById(passengerId)
      );
    },
    canAcceptMoreBags(flight) {
      // Implement your logic to determine if the flight can accept more bags
    },
    hasAvailableSeats(flight) {
      // Implement your logic to determine if the flight has available seats
    },
    __resolveReference(reference, { dataSources }) {
      return dataSources.flightsAPI.getFlightById(reference.flightId);
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`Flight service ready at ${url}`);
});
