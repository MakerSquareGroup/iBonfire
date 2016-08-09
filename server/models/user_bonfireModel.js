const db = require('../db/db.js');

const User_Bonfire = module.exports;

User_Bonfire.createJoinTable = (attr) => {
	return new Promise((resolve, reject) => {
		return db('Users_Bonfires').insert(attr)
			.then((result) => {
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

User_Bonfire.checkIfUserExists = (userId, bonfireId) => {
	console.log(userId, "USERID IN MODEL")
	return db('Users_Bonfires').where({
			id_Bonfires: bonfireId
		}).where({
			id_Users: userId
		})
		.then((rows) => {
			console.log(rows)
			return rows;
		})
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

User_Bonfire.findBonfiresById = (bonfireId) => {
	return db('Users_Bonfires').where({
			id_Bonfires: bonfireId
		})
		.then((rows) => {
			return rows;
		})
};

User_Bonfire.findAllUsers = (bonfireId) => {
	return db("Users_Bonfires").where({
		id_Bonfires: bonfireId
	})
};