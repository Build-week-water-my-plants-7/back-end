const router = require('express').Router();
const model = require('./user-data');

router.get('/', (req, res) => {
    res.status(200).json(species);
});

module.exports = router;