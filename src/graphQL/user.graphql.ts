import { gql } from "apollo-server";

export const UserType = gql`
  type User {
    _id: ID
    name: String
    email: String
    createdAt: String
    updatedAt: String
    deletedAt: String
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type Query {
    getAllUsers: [User]!
    getUserById(id: ID!): User!
    getUserByEmail(email: String!): User!
  }

  type Mutation {
    createUser(user: UserInput!): User!
    updateUser(id: ID!, user: UserInput!): User!
    deleteUser(id: ID!): User!
  }
`;
