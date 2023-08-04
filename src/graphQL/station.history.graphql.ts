import { gql } from "apollo-server";

export const HistoryStationType = gql`
  type StationHistory {
    _id: ID!
    station: String!
    user: String!
    rechargeTime: String!
    duration: Int!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
  }

  input StationHistoryInput {
    station: String
    user: String
    rechargeTime: String
    duration: Int
  }

  type Query {
    getAllStationHistories: [StationHistory]
    getStationHistoryById(id: String): StationHistory
  }

  type Mutation {
    createStationHistory(stationHistory: StationHistoryInput): StationHistory
    updateStationHistory(
      id: String
      stationHistory: StationHistoryInput
    ): StationHistory
    deleteStationHistory(id: String): StationHistory
  }
`;
