import { gql } from "apollo-server";

export const ReservationType = gql`
  scalar Date

  type Reservation {
    _id: ID
    stationName: String
    userEmail: String
    startDate: Date
    endDate: Date
  }

  input ReservationInput {
    stationName: String!
    userEmail: String!
    startDate: Date!
    endDate: Date!
  }

  type Query {
    getAllReservations: [Reservation]!
  }

  type Mutation {
    reservation(reservation: ReservationInput!): Reservation!
    updateReservation(id: ID!, reservation: ReservationInput!): Reservation!
  }
`;
