const { ApolloServer, gql } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');

const typeDefs = gql`
  # Opt in to Federation 2
  extend schema
  @link(
    url: "https://specs.apollo.dev/federation/v2.3"
    import: [
      "@key"
    ]
  )

  schema {
    query: Query
  }

  type Flight @key(fields: "flightId") {
    flightId: ID!
  }

  type Passenger @key(fields: "passengerId") {
    passengerId: ID!
  }

  type Booking @key(fields: "bookingId") {
    bookingId: ID!
    passenger: Passenger!
    flight: Flight!
  }

  type BookingFees {
    bookingId: ID!
    flight: Flight!
    passenger: Passenger!
    bagPrice: Float!
  }

  type SeatAvailability {
    bookingId: ID!
    flight: Flight!
    passenger: Passenger!
  }

  type Query {
    bookingFees(bookingId: ID!): BookingFees
    booking(bookingId: ID!): Booking
    seatAvailability(bookingId: ID!): SeatAvailability
  }
`;

const resolvers = {
  Booking: {
    passenger(booking, _, { dataSources }) {
      return dataSources.passengersAPI.getPassengerById(booking.passengerId);
    },
    flight(booking, _, { dataSources }) {
      return dataSources.flightsAPI.getFlightById(booking.flightId);
    },
    __resolveReference(reference, { dataSources }) {
      return dataSources.bookingsAPI.getBookingById(reference.bookingId);
    },
  },
  BookingFees: {
    flight(bookingFees, _, { dataSources }) {
      return dataSources.flightsAPI.getFlightById(bookingFees.flightId);
    },
    passenger(bookingFees, _, { dataSources }) {
      return dataSources.passengersAPI.getPassengerById(bookingFees.passengerId);
    },
    bagPrice(bookingFees) {
      // Implement your logic to calculate the bag price for the booking
    },
  },
  SeatAvailability: {
    flight(seatAvailability, _, { dataSources }) {
      return dataSources.flightsAPI.getFlightById(seatAvailability.flightId);
    },
    passenger(seatAvailability, _, { dataSources }) {
      return dataSources.passengersAPI.getPassengerById(seatAvailability.passengerId);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }])
});

server.listen({ port: 4003 }).then(({ url }) => {
  console.log(`Booking service ready at ${url}`);
});