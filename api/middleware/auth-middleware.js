const { jwtSecret } = require('../secrets/index')
const jwt = require('jsonwebtoken')
const Users = require('../users/users-model')
const db = require('../../data/db-config')

const restricted = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (token) {
            jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({ you: "can't touch this" })
                } else {
                    req.decodedJwt = decodedToken
                    console.log(req.decodedJwt)
                    next()
                }
            })
        } else {
            throw new Error('invalid auth data')
        }
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}

async function checkForUsername(req, res, next) {
    try {
        const username = req.body.username
        const user = await db
            .select('username')
            .from('users')
            .where({ username })
        console.log(user)
        console.log(username)
        if (user.length >= 1) {
            res.status(422).json({ message: 'username taken' })
        } else {
            next()
        }
    } catch (err) {
        next({
            apiCode: 500,
            apiError: 'error checking if username exists',
            ...err
        })
    }
}

async function checkUsernameExists(req, res, next) {
    try {
        const username = req.body.username
        const user = await db
            .select('username')
            .from('users')
            .where({ username })
        if (user.length === 0) {
            res.status(401).json({
                message: 'username doesnt have an account'
            })
        } else {
            next()
        }
    } catch (err) {
        next({
            apiCode: 500,
            apiError: 'error checking if username exists',
            ...err
        })
    }
}

function requirePassword(req, res, next) {
    const { password } = req.body
    if (!password) {
        res.status(401).json({ message: 'password required' })
    } else {
        next()
    }
}

module.exports = {
    restricted,
    checkForUsername,
    checkUsernameExists,
    requirePassword
}