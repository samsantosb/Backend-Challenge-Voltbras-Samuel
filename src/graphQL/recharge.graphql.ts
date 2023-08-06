import { gql } from "apollo-server";

export const RechargeType = gql`
  type Recharge {
    _id: ID!
    stationId: String!
    userId: String!
    inProgress: Boolean!
    endDate: String!
  }

  input RechargeInput {
    stationId: String!
    userId: String!
    endDate: String!
  }

  type Query {
    getAllRecharges: [Recharge]
    getRechargeById(id: String): Recharge
  }

  type Mutation {
    recharge(recharge: RechargeInput): Recharge
  }
`;
