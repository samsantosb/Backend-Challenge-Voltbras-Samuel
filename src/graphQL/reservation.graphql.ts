import { gql } from "apollo-server";

export const ReservationType = gql`
  type Reservation {
    _id: ID!
    station: String!
    user: String!
    startTime: String!
    endTime: String!
    inProgress: Boolean!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
  }

  input ReservationInput {
    station: String
    user: String
    startTime: String
    endTime: String
    inProgress: Boolean
  }

  type Query {
    getAllReservations: [Reservation]
    getReservationById(id: String): Reservation
  }

  type Mutation {
    createReservation(reservation: ReservationInput): Reservation
    updateReservation(id: String, reservation: ReservationInput): Reservation
    deleteReservation(id: String): Reservation
  }
`;
