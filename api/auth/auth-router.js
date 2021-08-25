const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { checkUsernameExists } = require("../middleware/auth-middleware");
const {checkUser}= require('../middleware/auth-middleware');
const { JWT_SECRET } = require("../secrets/index"); // use this secret!
const Users = require("../users/users-model");
const jwt = require("jsonwebtoken");



//register
router.post("/register", checkUser, (req, res, next) => {
    let user = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(user.password, rounds);
    // added token to the return from register
    user.password = hash;
    Users.add(user)
      .then((newUser) => {
        const token = makeToken(newUser)
        res.status(201).json({user:newUser, token});
      })
      .catch(next);
  });
  

  //login
  router.post("/login", checkUsernameExists, (req, res, next) => {
    let { username, password } = req.body;
  
    Users.findBy({ username }) // it would be nice to have middleware do this
      .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = makeToken(user);
          res.status(200).json({
            user_id: user.user_id,
            username: user.username,
            token,
            message: "Welcome back."
          });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(next);
  });

  function makeToken(user) {
    const payload = {
      subject: user.user_id,
      username: user.username,
    };
    const options = {
      expiresIn: "24h",
    };
    return jwt.sign(payload, JWT_SECRET, options);
  }

module.exports = router;