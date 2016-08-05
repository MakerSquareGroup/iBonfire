const db = require('../db/db.js');

const User = module.exports;

User.findAllUsers = () => {
	return db('Users')
		.then((rows) => {
			return rows;
		});
};

User.findUserById = (FB_id) => {
	return db('Users').where({
			FB_id: FB_id
		}).limit(1)
		.then((rows) => {
			return rows[0];
		});
};

User.findUserByLocation = (latitude, longitude) => {
	return db('Users').where({
			latitude: latitude,
			longitude: longitude
		}).limit(1)
		.then((rows) => {
			return rows[0];
		});
};

User.findUserBonfires = (FB_id) => {
	return db('Bonfires').where({
			id_Users: FB_id
		})
		.then((rows) => {
			return rows;
		})
};

User.createUser = (attr) => {
	return new Promise(function(resolve, reject) {
		return db('Users').insert(attr)
			.then(function(result) {
				attr.id = result[0];
				resolve(attr);
			});
	});
};

User.deleteUser = function(id) {
	return db('Users').where({
			FB_id: id
		}).del()
		.then((response) => {
			return response;
		})
}
