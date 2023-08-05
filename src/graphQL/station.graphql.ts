import { gql } from "apollo-server";

export const StationType = gql`
  type Station {
    _id: ID
    planetName: String
    stationName: String
    createdAt: String
    updatedAt: String
    deletedAt: String
  }

  input StationInput {
    planetName: String
    stationName: String
  }

  type Query {
    stations: [Station]
    getStationById(id: ID): Station!
    getStationByPlanetName(name: String): Station
  }

  type Mutation {
    installStation(station: StationInput): Station
    updateStation(id: ID, station: StationInput!): Station
    deleteStation(id: ID): Station
  }
`;
