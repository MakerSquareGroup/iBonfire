const config = require('../../knex.js');
const env = 'development';
const knex = require('knex')(config[env]);

module.exports = knex;


// Drops all tables and clears db
knex.wipeDatabase = () => {
	return knex('users').truncate()
		.then(() => {
			return knex('bonfire').truncate();
		});
	console.log("Welp, you done did it now...No more data")
};

// The ensureSchema function builds the schema for the db

knex.ensureSchema = () => {
	return Promise.all([
		knex.schema.hasTable('users')
		.then(exists => {
			if (!exists) {
				knex.schema.createTable('users', table => {
						table.increments('id').primary();
						table.string('name', 50);
						table.string('latitude', 50);
						table.string('longitude', 50);
						table.string('cityState', 255);
						table.string('FB_id', 50);
						table.string('FB_img', 150);
						table.string('FB_timeline', 150);
						table.timestamp('created_by_User_at').defaultTo(knex.fn.now());
						table.integer('id_Bonfires').unsigned().references('id').inTable('bonfires');
						table.timestamps();
					})
					.then(table => {
						console.log('Users Table has been created.');
					});
			}
		}),

		knex.schema.hasTable('bonfires')
		.then(exists => {
			if (!exists) {
				knex.schema.createTable('bonfires', table => {
						table.increments('id').primary();
						table.string('tags', 50);
						table.string('description', 255);
						table.string('latitude', 50);
						table.string('longitude', 50);
						table.string('cityState', 255);
						table.timestamp('created_by_User_at').defaultTo(knex.fn.now());
						table.integer('id_Users').unsigned().references('id').inTable('users');
						table.timestamps();
					})
					.then(table => {
						console.log('Bonfires Table has been created.');
					});
			}
		})
	]);
};