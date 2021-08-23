const db = require("../../data/db-config");

function find() {
  return db("species");
}

function findBy(filter) {
  return db("species").where(filter);
}

function findById(id) {
  return db("species").where("species_id", id);
}

function add(species) {
  return db("species")
    .insert(species, "species_id")
    .then(([id]) => {
      return db("species").where("species_id", id).first();
    });
}

module.exports = {
  find,
  findBy,
  findById,
  add,
};