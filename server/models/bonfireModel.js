const db = require('../db/db.js');

const Bonfire = module.exports;

Bonfire.findAllBonfires = (req, res) => {
	return db('bonfires')
		.then(rows => {
			return rows;
		});
};

Bonfire.findBonfireById = id => {
	return db('bonfires').where({
			id: id
		}).limit(1)
		.then(rows => {
			return rows[0];
		});
};

Bonfire.findBonfireByLocation = (latitude, longitude) => {
	return db('bonefires').where({
			latitude: latitude,
			longitude: longitude
		}).limit(1)
		.then(rows => {
			return rows[0]
		});
}

Bonfire.createBonfire = function(attr) {
	return new Promise(function(resolve, reject) {
		return db('bonfires').insert(attr)
			.then(function(result) {
				attr.id = result[0];
				resolve(attr);
			});
	});
};