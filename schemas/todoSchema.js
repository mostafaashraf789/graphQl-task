const { gql } = require("apollo-server-express");

module.exports = gql`
  type Todo {
    id: ID!
    title: String!
    description: String
    user: User!
  }

  type Query {
    getAllTodos: [Todo]
    getTodoById(id: ID!): Todo
    getTodosByUser(userId: ID!): [Todo]
  }

  type Mutation {
    addTodo(title: String!, description: String, userId: ID!): Todo
    updateTodo(id: ID!, title: String, description: String): Todo
    deleteTodo(id: ID!): String
  }
`;
