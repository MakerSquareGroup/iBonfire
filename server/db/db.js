const config = require('../../knex.js');
const env = 'development';
const knex = require('knex')(config[env]);

module.exports = knex;


// Drops all tables and clears db
knex.wipeDatabase = () => {
	return knex('Users').truncate()
		.then(() => {
			return knex('Bonfires').truncate();
		});
	console.log("Welp, you done did it now...No more data")
};

// The ensureSchema function builds the schema for the db

knex.ensureSchema = () => {
	return Promise.all([
		knex.schema.hasTable('Users')
		.then(exists => {
			if (!exists) {
				knex.schema.createTable('Users', table => {
						table.increments('id').primary();
						table.string('name', 50);
						table.string('latitude', 50);
						table.string('longitude', 50);
						table.string('cityState', 50);
						table.string('FB_id', 50);
						table.string('FB_img', 150);
						table.string('FB_timeline', 150);
						table.timestamp('created_by_User_at').defaultTo(knex.fn.now());
						table.timestamps();
					})
					.then(table => {
						console.log('Users Table has been created.');
					});
			}
		}),

		knex.schema.hasTable('Bonfires')
		.then(exists => {
			if (!exists) {
				knex.schema.createTable('Bonfires', table => {
						table.increments('id').primary();
						table.string('tags', 50);
						table.string('description', 255);
						table.string('latitude', 50);
						table.string('longitude', 50);
						table.string('cityState', 50);
						table.timestamp('created_by_User_at').defaultTo(knex.fn.now());
						table.timestamps();
					})
					.then(table => {
						console.log('Bonfires Table has been created.');
					});
			}
		}),

		knex.schema.hasTable('Users_Bonefires')
		.then((exists) => {
			if(!exists) {
				knex.schema.createTaBle('Users_Bonfires', (table) => {
					table.increments('id').primary();
					table.string('id_Users').unsigned().references('FB_id').inTable('Users');
					table.integer('id_Bonfires').unsigned().references('id').inTable('Bonfires');
				})
				.then((table) => {
					console.log("Users_Bonfires join table has been created.");
				});
			}
		})
	]);
};