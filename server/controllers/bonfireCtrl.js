const Bonfire = require('../models/bonfireModel.js');
const User = require('../models/userModel.js');
const url = require('url');

module.exports = {
	'/': {
		get: (req, res) => {
			console.log('Recieved GET at /api/bonfire');
			console.log('Sending all bonfires');

			Bonfire.findAllBonfires(req, res)
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
								console.log("Result from bonfire controller createTable", result);
								return res.send(result);
							});
					}
				});
		}
	}
};