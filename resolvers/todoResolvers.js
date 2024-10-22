const Todo = require("../models/todoModel");

module.exports = {
  Query: {
    getAllTodos: async () => await Todo.find().populate("user"),
    getTodoById: async (_, { id }) => await Todo.findById(id).populate("user"),
    getTodosByUser: async (_, { userId }) => await Todo.find({ user: userId }),
  },
  Mutation: {
    addTodo: async (_, { title, description, userId }) => {
      const todo = new Todo({
        title,
        description,
        user: userId,
      });
      await todo.save();
      return todo.populate("user");
    },
    updateTodo: async (_, { id, title, description }) => {
      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      ).populate("user");
      return updatedTodo;
    },
    deleteTodo: async (_, { id }) => {
      await Todo.findByIdAndDelete(id);
      return "Todo deleted successfully";
    },
  },
};
