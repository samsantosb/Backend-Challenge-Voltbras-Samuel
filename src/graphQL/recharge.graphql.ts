import { gql } from "apollo-server";

export const RechargeType = gql`
  scalar Date

  type Recharge {
    _id: ID
    stationName: String
    userEmail: String
    inProgress: Boolean
    startDate: Date
    endDate: Date
    totalTime: String
  }

  input RechargeInput {
    stationName: String!
    userEmail: String!
    endDate: Date!
  }

  type Query {
    getAllRecharges: [Recharge]
    stationHistory(stationName: String): [Recharge]
  }

  type Mutation {
    recharge(recharge: RechargeInput): Recharge
  }
`;
