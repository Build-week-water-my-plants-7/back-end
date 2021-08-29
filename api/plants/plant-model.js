const db = require('../../data/db-config')

const findPlants = () => {
    return db('plants').orderBy('plants.id')
}

const findById = (id) => {
    return db('plants').where({ id }).first()
}

const addPlant = async (plant) => {
    const [id] = await db('plants').returning('id').insert(plant)
    return findById(id)
}

const removePlant = (id) => {
    return db('plants').where({ id }).del()
}

const updatePlant = (id, changes) => {
    return db('plants').where({ id }).update(changes)
}

module.exports = {
    findPlants,
    findById,
    addPlant,
    removePlant,
    updatePlant
}