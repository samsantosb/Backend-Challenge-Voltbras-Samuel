import { gql } from "apollo-server";

export const StationType = gql`
  type Station {
    _id: ID
    name: String
    planetName: String
    createdAt: String
    updatedAt: String
    deletedAt: String
  }

  input StationInput {
    name: String!
    planetName: String!
  }

  type Query {
    stations: [Station]
  }

  type Mutation {
    installStation(station: StationInput): Station
    updateStation(id: ID, station: StationInput!): Station
    deleteStation(id: ID): Station
  }
`;
