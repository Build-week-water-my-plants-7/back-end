const router = require('express').Router();
const model = require('./species-data');

router.get('/', (req, res) => {
    res.status(200).json(species);
});

module.exports = router;