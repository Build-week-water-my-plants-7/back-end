const db = require('../../data/db-config');

async function findAll() {
    return db('plants').orderBy('plants.id')
}

async function findById(id) {
    return db('plants').where({id}).first();
}

async function add(plant) {
   const [id] = await db('plants')
   .returning('id')
   .insert(plant)

   return findById(id);
}

async function remove(id) {
    return db('plants').where({id}).del();
}

async function update(id, changes) {
   return db('plants').where({id}).update(changes);
}

module.exports = {
    findAll,
    findById,
    add,
    update,
    remove
}