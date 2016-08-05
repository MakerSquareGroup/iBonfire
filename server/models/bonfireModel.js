const db = require('../db/db.js');

const Bonfire = module.exports;

Bonfire.findAllBonfires = (req, res) => {
	return db('Bonfires')
		.then(rows => {
			return rows;
		});
};

Bonfire.findBonfireById = id => {
	return db('Bonfires').where({
			id: id
		}).limit(1)
		.then(rows => {
			return rows[0];
		});
};

Bonfire.findBonfireByLocation = (latitude, longitude) => {
	return db('Bonfires').where({
			latitude: latitude,
			longitude: longitude
		}).limit(1)
		.then(rows => {
			return rows[0]
		});
};

Bonfire.createBonfire = (attr) => {
	return new Promise((resolve, reject) => {
		return db('Bonfires').insert(attr)
			.then(function(result) {
				attr.id = result[0];
				resolve(attr);
			});
	});
};

Bonfire.deleteBonfire = (id) => {
	return db('Bonfires').where({
			id: id
		}).del()
		.then(response => {
			return response;
		})
};

