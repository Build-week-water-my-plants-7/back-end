const router = require('express').Router()
const Plant = require('./plant-model')
const reqBody = require('../middleware/routeMiddleware')

//Get plants
router.get('/', async (req, res, next) => {
    try {
        const plant = await Plant.findPlants()
        res.json(plant)
    } catch (err) {
        next({ apiCode: 500, apiError: 'error getting plants', ...err })
    }
})

// Get by ID
router.get('/:id', async (req, res, next) => {
    try {
        const plant = await Plant(Plant.findById(req.params.id))
        res.json(plant)
    } catch (err) {
        next({ apiCode: 500, apiError: 'error getting plant', ...err })
    }
})

// Add plant
router.post('/', reqBody, async (req, res, next) => {
    try {
        let plant = await Plant.addPlant(req.body)
        res.status(201).json(plant)
    } catch (err) {
        next({ apiCode: 500, apiError: 'error creating plant', ...err })
    }
})

// Update Plant
router.put('/:id', reqBody, async (req, res, next) => {
    try {
        const plant = await Plant.updatePlant(req.params.id, req.body)
        res.json(req.body)
    } catch (err) {
        next({ apiCode: 500, apiError: 'error pdating plant', ...err })
    }
})

// Delete Plant
router.delete('/:id', async (req, res, next) => {
    try {
        const plant = await Plant.removePlant(req.params.id)
        res.json({ message: `Plant removed with the ID of ${req.params.id}` })
    } catch (err) {
        next({ apiCode: 500, apiError: 'error deleting plant', ...err })
    }
})

module.exports = router