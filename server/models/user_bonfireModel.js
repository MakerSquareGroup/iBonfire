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
			return rows[0];
		});
};

User_Bonfire.joinBonfire = (UserID, bonfireId) => {
	return new Promise((resolve, reject) => {
		return db('Users_Bonfires').where({
				id_Bonfires: bonfireId
			}).insert({
				id_Users: UserID,
				id_Bonfires: bonfireId
			})
			.then((response) => {
				resolve(response)
				return response;
			})
	})
};