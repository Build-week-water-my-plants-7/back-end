const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const userRouter = require('./users/users-router')
const plantRouter = require('./plants/plant-router')
const authRouter = require('./auth/auth-router')
const errorHandler = require('./errorHandler')
const router = require('./users/users-router')
const { restricted } = require('./middleware/auth-middleware')

const server = express()

server.use(cors())
server.use(express.json())
server.use(morgan('dev'))

server.use(errorHandler)

server.use('/api/users', userRouter)
server.use('/api/plants', plantRouter)
server.use('/api/auth', authRouter)

module.exports = server