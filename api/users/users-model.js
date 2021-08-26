const bcrypt = require('bcrypt');
const db = require('../../data/db-config');

const find = () => {
	return db
		.select('u.id', 'u.username', 'u.phoneNumber')
		.from('users as u')
		.orderBy('u.id')
};

const findBy = (filter) => {
    return db('users').where(filter)
}

const findById = async (id) => {
    const user = await db
        .select('u.id', 'u.username', 'u.phoneNumber')
        .from('users as u')
        .where({ id })
        .first()
    const newObj = {
        id: user.id,
        username: user.username,
        phoneNumber: user.phoneNumber,
        plants: await findPlants(user.id)
    }
    return newObj
}

const findPlants = async (id) => {
    const plants = await db('plants as p')
        .join('users_plants as upl', 'upl.plant_id', 'p.id')
        .join('users as u', 'u.id', 'upl.user_id')
        .select('p.id', 'p.nickname', 'p.species', 'p.h2o_frequency', 'p.image')
        .where({ 'upl.user_id': id })
        .groupBy('p.id')
        .then((row) => {
            return row
        })
    return plants
}

const addUser = async (user) => {
    const [id] = await db('users').returning('id').insert(user)
    return findById(id)
}

const addPlants = (id, plantId) => {
    return db('users_plants').insert({ user_id: id, plant_id: plantId })
}

const updateProfile = async (id, changes) => {
    const hash = bcrypt.hashSync(changes.password, 8)
    changes.password = hash
    const [updatedId] = await db('users')
        .where({ id: updatedId })
        .update({
            username: changes.username,
            phone_number: changes.phoneNumber,
            password: changes.password
        })
        .returning('id')
    const updated = await db('users').where({ id: updatedId }).first()

    return updated
}

const remove = (id) => {
    return db('users').where({ id }).del()
}

const removePlants = (id, plantId) => {
    return db('users_plants').where({ user_id: id, plant_id: plantId }).del()
}

module.exports = { 
	find, 
	findBy, 
	findById, 
	findPlants,
	addUser, 
	addPlants,
	updateProfile, 
	remove,
	removePlants
}; 