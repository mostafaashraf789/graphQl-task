// src/server.js
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = [
  require("./schemas/userSchema"),
  require("./schemas/todoSchema"),
];
const resolvers = [
  require("./resolvers/userResolvers"),
  require("./resolvers/todoResolvers"),
];
const authMiddleware = require("./utils/auth");
require("dotenv").config();

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => authMiddleware({ req }),
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  try {
    // Connect to MongoDB using async/await
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");

    app.listen(PORT, () =>
      console.log(
        `Server running at http://localhost:${PORT}${server.graphqlPath}`
      )
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

startServer();
