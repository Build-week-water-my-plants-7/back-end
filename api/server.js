const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// const AuthRouter = require("./auth/auth-router");
// const PlantRouter = require("./plants/plant-router");
// const SpeciesRouter = require("./species/species-router");
// const UserRouter = require("./users/users-routers");

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());

//Sets up the router
// server.use("/api/auth", AuthRouter);
// server.use("/api/users", PlantRouter);
// server.use("/api/species", SpeciesRouter);
// server.use("/api/reviews", UserRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: process.env.MOTD });
});

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });

module.exports = server;