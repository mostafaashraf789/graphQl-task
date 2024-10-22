const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String
  }

  type Query {
    getAllUsers: [User]
    getUserById(id: ID!): User
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): String
  }
`;
