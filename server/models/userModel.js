const db = require('../db/db.js');

const User = module.exports;

User.findAllUsers = () => {
	return db('users')
		.then(rows => {
			return rows;
		});
};

User.findUserById = id => {
	return db('users').where({
		username: username
	}).limit(1)
	.then(rows => {
		return rows[0];
	});
};

User.createUser = function(attr) {
	return new Promise(function(resolve, reject) {
		return db('user').insert(attr)
			.then(function(result) {
				attr.id = result[0];
				resolve(attr);
			});
	});
};