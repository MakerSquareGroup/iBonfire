const path = require('path');

module.exports = {

	development: {
		client: 'mysql',
		connection: {
			host: 'ibonfire.ryanmorrisj.com',
			user: 'username here',
			password: 'password here',
			database: 'ibonfire',
			charset: 'utf8'
		}
	}
};

