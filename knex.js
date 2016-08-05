const path = require('path');
require('dotenv').config();

module.exports = {

	development: {
		client: 'mysql',
		connection: {
			host: 'ibonfire.ryanmorrisj.com',
			user: process.env.db_username,
			password: process.env.db_password,
			database: 'iBonfire-DB',
			charset: 'utf8'
		}
	}
};

