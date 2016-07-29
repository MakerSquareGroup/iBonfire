const db = require('../db/db.js');

const Bonfire = module.exports;

Bonfire.findAllBonfires = () => {
	return db('bonfires')
		.then(rows => {
			return rows;
		});
};

Bonfire.findBonfireById = id => {
	return db('bonfire').where({
			id: id
		}).limit(1)
		.then(rows => {
			return rows[0];
		});
};

Bonfire.createBonfire = function(attr) {
	return new Promise(function(resolve, reject) {
		return db('bonfire').insert(attr)
			.then(function(result) {
				attr.id = result[0];
				resolve(attr);
			});
	});
};