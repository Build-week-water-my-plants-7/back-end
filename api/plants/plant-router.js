const router = require('express').Router();
const model = require('./plant-data');

router.get('/', (req, res) => {
    res.status(200).json(plant);
});

module.exports = router;