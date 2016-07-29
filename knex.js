const path = require('path');

module.exports = {

	development: {
		client: 'mysql',
		connection: {
			host: 'ibonfire.ryanmorrisj.com',
			user: process.env.db_username,
			password: process.env.db_password,
			database: 'ibonfire',
			charset: 'utf8'
		}
	}
};


// db_username = 'teamBlaze'
// db_password = 'teamBlaze1234'

// user     : process.env.db_username,
// password : process.env.db_password,