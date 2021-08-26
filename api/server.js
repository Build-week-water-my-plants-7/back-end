const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const AuthRouter = require("./auth/auth-router");
const PlantRouter = require("./plants/plant-router");
const UserRouter = require("./users/users-router");
const errorHandler = require('./errorHandler')

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());

server.use(errorHandler)

//Sets up the router
server.use("/api/auth", AuthRouter);
server.use("/api/plants", PlantRouter);
server.use("/api/users", UserRouter);

module.exports = server;