const Bonfire = require('../models/bonfireModel.js');
const User = require('../models/userModel.js');
const url = require('url');

module.exports = {
	'/': {
		get: (req, res) => {
			console.log('Recieved GET at /api/bonfire');
			console.log('Sending all bonfires');

			Bonfire.findAllBonfires()
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
			console.log("Received PUT at /api/bonfire/");
			res.end("Received PUT at /api/bonfire");
		},
		delete: (req, res) => {
			console.log("Received DELETE at /api/bonfire/");
			res.end("Received Delete at /api/bonfire");
		}
	},

	// Bonfire specs can be in the form of bonfire id or latitude&longitude so that a user can be searched by either id or coordinates
	// For example:

	// Search by bonfire Id:
	// /api/bonfire/1

	// Search by coordinates
	// /api/bonfire/34.024212&-118.496475

	'/:bonfire_specs': {
		get: (req, res) => {
			console.log('Recieved GET at /api/bonfire');
			console.log(req.params, "This is the params object in bonfires");

			// This function checks for the type of prop you are searching for
			var getParams = checkParamsBonfire(req.params.bonfire_specs);

			if (Array.isArray(getParams)) {
				Bonfire.findrBonfireByLocation(getParams[0], getParams[1])
					.then((bonfire) => {
						if (!bonfire) {
							console.log('Bonfire at ' + getParams + ' does not exist!');
							res.end('Bonfire at' + getParams + ' does not exist!');
						} else {
							console.log('Found the bonfire you are looking for!');
							res.send(bonfire);
						}
					});
			} else {
				Bonfire.findBonfireById(getParams)
					.then((bonfire) => {
						if (!bonfire) {
							console.log('Bonfire with bonfire id ' + getParams + ' does not exist!');
							res.end('Bonfire with bonfire id ' + getParams + ' does not exist!');
						} else {
							console.log('Found the bonfire you are looking for!');
							res.send(bonfire);
						}
					});
			}
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

// The below functions, checkParamBonfire and seperateLatLongBonfire are used to determine the proper endpoint
// based on coordinates or Facebook ID

checkParamsBonfire = getParams => {
	var reg = /[&]/g;
	if (getParams.match(reg)) {
		console.log("This GET request is for a bonfire at a coordinate");
		return seperateLatLongBonfire(getParams);
	} else {
		console.log("This GET request finds a bonfire based on the bonfire id");
		return getParams;
	}
};

seperateLatLongBonfire = getParams => {
	var reg = /[&]/;
	var coords = getParams.split(reg);

	return coords;
};


var postmanbonfire = {
	"name": "Ryan's",
	"description": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTObsbvRGTJUXbhzLkABpz25DUm9L37LV05xAsUpeT8hI4I49Lj",
	"latitude": "32.024212",
	"longitude": "-118.496475",
	"location": "santa monica",
	"id_Users": "115548485"
}