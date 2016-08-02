const Bonfire = require('../models/bonfireModel.js');
const User = require('../models/userModel.js');
const url = require('url');

module.exports = {
	'/': {
		get: (req, res) => {
			console.log('Recieved GET at /api/bonfire');
			console.log('Sending all bonfires');

			Bonfire.findAllBonfire()
				.then((bonfires) => {
					if (bonfires.length === 0) {
						console.log('There are no bonfires');
						res.end('There are no bonfires');
					} else {
						console.log('We got bonfires!');
						res.send(bonfires);
					}
				});
		},

		post: (req, res) => {
			console.log('Recieved POST at api/bonfire');
			console.log('Creating bonfire');

			var newBonfire = {
				name: req.body.name,
				description: req.bod.description,
				latitude: req.body.latitude,
				longitude: req.body.longitude,
				location: req.body.location,
				id_Users: req.body.id_Users
			};

			Bonfire.findBonfireByLocation(newBonfire.latitude, newBonfire.longitude)
				.then((bonfire) => {
					if (bonfire) {
						console.log('Bonfire is already blazing!');
						res.end('Bonfire is already blazing!');
					} else {
						Bonfire.createTable(newBonfire)
							.then((result) => {
								console.log('Result from bonfire controller createTable', result);
								res.send(result);
							});
					}
				});
		},

		put: (req, res) => {
			console.log("Received PUT at /api/user/");
			res.end("Received PUT at /api/user");
		},

		delete: (req, res) => {
			console.log("Received DELETE at /api/user/");
			res.end("Received Delete at /api/user");
		}
	},

	'/:bonfire_specs': {
		get: (req, res) => {
			console.log('Recieved GET at /api/bonfire');
			console.log('Sending all bonfires');

			Bonfire.findAllBonfire()
				.then((bonfires) => {
					if (bonfires.length === 0) {
						console.log('There are no bonfires');
						res.end('There are no bonfires');
					} else {
						console.log('We got bonfires!');
						res.send(bonfires);
					}
				});
		},

		post: (req, res) => {
			console.log('Recieved POST at api/bonfire');
			res.end('Recieved POST at api/bonfire');
			
		},

		put: (req, res) => {
			console.log("Received PUT at /api/bonfire/");
			res.end("Received PUT at /api/bonfire");
		},

		delete: (req, res) => {
			console.log("Received DELETE at /api/bonfire/");
			res.end("Received Delete at /api/bonfire");
		}
	}

};

var postmanbonfire = {
	"name": "Ryan's",
	"description": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTObsbvRGTJUXbhzLkABpz25DUm9L37LV05xAsUpeT8hI4I49Lj",
	"latitude": "32.024212",
	"longitude": "-118.496475",
	"location": "santa monica",
	"id_Users": "115548485"
}