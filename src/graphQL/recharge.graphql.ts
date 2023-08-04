import { gql } from "apollo-server";

export const RechargeType = gql`
  type Recharge {
    _id: ID!
    station: String!
    user: String!
    inProgress: Boolean!
    endDate: String!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
  }

  input RechargeInput {
    station: String!
    user: String!
    inProgress: Boolean!
    endDate: String!
  }

  type Query {
    getAllRecharges: [Recharge]
    getRechargeById(id: String): Recharge
  }

  type Mutation {
    createRecharge(recharge: RechargeInput): Recharge
    updateRecharge(id: String, recharge: RechargeInput): Recharge
    deleteRecharge(id: String): Recharge
  }
`;
