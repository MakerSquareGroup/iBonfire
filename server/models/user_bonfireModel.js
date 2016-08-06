const db = require('../db/db.js');

const User_Bonfire = module.exports;

User_Bonfire.createJoinTable = (attr) => {
	return new Promise((resolve, reject) => {
		return db('Users_Bonfires').insert(attr)
		.then((result) => {
			console.log(result, "THIS IS result");
			console.log(attr, "THIS IS ATTR");
			attr.id = result[0];
			resolve(attr);
		});
	})
};

User_Bonfire.findJoinTable = (bonfireId) => {
	return db('Users_Bonfires').where({
			id_Bonfires: bonfireId
		}).limit(1)
		.then((rows) => {
			return rows;
		});
};

User_Bonfire.checkIfUserExists = (joinId, userId) => {
	return new Promise((resolve, reject) => {
		return db('Users_Bonfires').where({
			id: joinId
		}).where({
			id_Users: userId
		})
		.then((rows) => {
			resolve(rows);
		});
	});
};

User_Bonfire.joinBonfire = (userId, bonfireId) => {
	return new Promise((resolve, reject) => {
		return db('Users_Bonfires').where({
				id_Bonfires: bonfireId
			}).insert({
				id_Users: userId,
				id_Bonfires: bonfireId
			})
			.then((response) => {
				resolve(response)
				return response;
			})
	})
};


User_Bonfire.findUserBonfires = (userId) => {
	return db('Users_Bonfires').where({
			id_Users: userId
		})
		.then((rows) => {
			return rows;
		})
};

User_Bonfire.findBonfiresById = (bonfireID) => {
	return db('Users_Bonfires').where({
			id_Bonfires: bonfireID
		})
		.then((rows) => {
			return rows;
		})
};
