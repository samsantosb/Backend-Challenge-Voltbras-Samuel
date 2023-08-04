import { gql } from "apollo-server";

export const StationType = gql`
  type Station {
    _id: ID!
    planetName: String!
    recharges: String!
    reservations: String!
    stationHistories: String!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
  }

  input StationInput {
    planetName: String!
    recharges: [String]!
    reservations: [String]!
    stationHistories: [String]!
  }

  type Query {
    getAllStations: [Station]!
    getStationById(id: ID!): Station!
    getStationByPlanetName(name: String!): Station!
  }

  type Mutation {
    createStation(station: StationInput!): Station!
    updateStation(id: ID!, station: StationInput!): Station!
    deleteStation(id: ID!): Station!
  }
`;
