const router = require('express').Router();
const Users = require('../users/users-model');
const {jwtSecret} = require('../secrets/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { requireBody } = require('../middleware/routeMiddleware');
const { checkUsernameExists, checkUsernameForFree, requirePassword } = require('../middleware/auth-middleware');

// Register a User
router.post('/register', requireBody, requirePassword, checkUsernameForFree, async (req, res, next) => {
    const credentials = req.body

    try {
        const hash = bcrypt.hashSync(credentials.password, 8)
        credentials.password = hash;

        let user = await Users.add(credentials);
     
        const token = generateToken(user);
   
        res.status(201).json({user, token})
    } catch (err) {
        next(err)
    }
})
// Log a user in
router.post('/login', requireBody, requirePassword, checkUsernameExists, async (req, res, next) => {
    const {username, password} = req.body;

    try {
        const [user] = await Users.findBy({username})
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({message: `${username} is back!`, token: token})
        } else {
            res.status(404).json({message: "Invalid login credentials"})
        }
    } catch (err) {
        next({apiCode: 500, apiMessage: 'Error Logging in User.', ...err})
    }
})

const generateToken = (user) => {
    const payload = {
        subject: user.id,
        username: user.username,
        phone_number: user.phone_number
    }

    const options = {
        expiresIn: "1d"
    }

    const token = jwt.sign(payload, jwtSecret, options);

    return token;
}

module.exports = router;