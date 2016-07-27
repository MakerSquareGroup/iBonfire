const config = require('../../knex.js');
const env = 'development';
const knew = require('knex')(config[env]);

module.exports = knex;

knex.wipeDatabase = () => {
	return knex('users').truncate()
	.then( () => {
		return knex('bonfire').truncate()
	});
};

// The ensureSchema function builds the database

knex.ensureSchema = () => {
	return Promise.all([
		knex.schema.hasTable('users')
		.then( exists => {
			if(!exists) {
				knex.schema.createTable('users', table => {
					table.increments('id').primary();
					table.string('username', 255);
					table.string('password', 255);
					table.string('location', 255);
					table.timestamp();
				})
				.then( table => {
					console.log('Users Table has been created.');
				})
			}
		}),

		knex.schema.hasTable('bonfire')
		.then( exists => {
			if(!exists) {
				knex.schema.createTable('bonefire', table => {
					table.increments('id').primary();
					table.string('address', 255);
					table.integer('id_Users').unsigned.references('id').inTable('users');

				})
			}
		})
	]);
}