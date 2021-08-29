const express = require('express');
const server = express();
const cors = require('cors');
const morgan = require('morgan')
const errorHandler = require('./errorHandler');
const usersRouter = require('../api/users/users-router');
const plantsRouter = require('../api/plants/plant-router')
const authRouter = require('./auth/auth-router');

server.use(cors());
server.use(express.json());
server.use(morgan('dev'))

server.use('/api/users', usersRouter);
server.use('/api/plants', plantsRouter)
server.use('/api/auth', authRouter);

server.use(errorHandler); 

module.exports = server;