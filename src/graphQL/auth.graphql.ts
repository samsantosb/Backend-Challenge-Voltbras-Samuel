import { gql } from "apollo-server";

export const AuthType = gql`
  type LoginResponse {
    token: String!
  }

  type Mutation {
    login(email: String!, password: String!): LoginResponse
  }
`;
