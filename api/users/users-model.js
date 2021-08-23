const db = require('../../data/db-config');

function find() {
	return db("users");
};

const findBy = filter => {
	return db('users').where(filter).first();
};

const findById = id => {
	return db('users').where({ id }).first();
};

async function addUser({ username, password }) {
	const [user_id] = await db('users').insert({
		username: username,
		password: password
	});
	return findById(user_id);
}

function updateProfile(id, changes) {
	return db("users")
	  .where("user_id", id)
	  .update(changes)
	  .then(() => {
		return db("users").where("user_id", id).first();
	  });
  }

  function remove(id) {
	return db("users").where({ user_id: id }).del();
  }

module.exports = { 
	find, 
	findBy, 
	findById, 
	addUser, 
	updateProfile, 
	remove,
}; 