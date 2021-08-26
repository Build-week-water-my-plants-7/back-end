const router = require('express').Router()
const Users = require('../users/users-model')
const { jwtSecret } = require('../secrets/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../../data/db-config')
const reqBody = require('../middleware/routeMiddleware')
const {
    checkUsernameExists,
    checkForUsername,
    requirePassword
} = require('../middleware/auth-middleware')


// Register 
router.post(
    '/register',
    reqBody,
    requirePassword,
    checkForUsername,
    async (req, res, next) => {
        const creds = req.body
        try {
            const hash = bcrypt.hashSync(creds.password, 8)
            creds.password = hash
            let user = await Users.add(creds)
            const token = generateToken(user)
            res.status(201).json({ user, token })
        } catch (err) {
            next(err)
        }
    }
)

// Login
router.post(
    '/login',
    reqBody,
    requirePassword,
    checkUsernameExists,
    async (req, res, next) => {
        const { username, password } = req.body

        try {
            const [user] = await Users.findBy({ username })

            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({
                    token: token
                })
            } else {
                res.status(404).json({ apiError: 'Invalid login credentials' })
            }
        } catch (err) {
            next({ apiCode: 500, apiError: 'error logging in', ...err })
        }
    }
)

const generateToken = (user) => {
    const payload = {
        subject: user.id,
        username: user.username,
        phone_number: user.phoneNumber
    }

    const options = {
        expiresIn: '1d'
    }

    const token = jwt.sign(payload, jwtSecret, options)

    return token
}

module.exports = router