const Bonfire = require('../models/bonfireModel.js');
const User = require('../models/userModel.js');
const User_Bonfire = require('../models/user_bonfireModel.js');
const Helpers = require('../helpers/ctrl_helpers.js');

module.exports = {
	'/': {
		get: (req, res) => {
			console.log('Recieved GET at /api/bonfire');
			console.log('Sending all bonfires!');

			Bonfire.findAllBonfires()
				.then((bonfires) => {
					if (bonfires.length === 0) {
						console.log('There are no bonfires');
						res.send([{
							latitude: 0,
							longitude: 0
						}]);
					} else {
						console.log('We got bonfires!');
						res.send(bonfires);
					}
				})
				.catch((err) => {
						console.log('Error inside findAllBonfires ', err);
				});
		},
		post: (req, res) => {
			console.log('Recieved POST at api/bonfire');

			var newBonfire = {
				tags: req.body.tags,
				description: req.body.description,
				latitude: req.body.latitude,
				longitude: req.body.longitude,
				cityState: req.body.cityState,
				createdBy: req.body.createdBy
			};

			Bonfire.findBonfireByLocation(newBonfire.latitude, newBonfire.longitude)
				.then((bonfire) => {
					if (bonfire) {
						console.log('Bonfire is already blazing!');
						res.end('Bonfire is already blazing!');
					} else {
						Bonfire.createBonfire(newBonfire)
							.then((result) => {
								console.log('Result from bonfire controller createBonfire', result);
								User_Bonfire.createJoinTable({
										id_Users: newBonfire.createdBy,
										id_Bonfires: result.id
									})
									.then((result) => {
										console.log("Result from bonfire controller in joinBonfire ", result);
										User_Bonfire.findJoinTable(result.id_Users)
											.then((result) => {
												console.log("Result from bonfire controller in findJoinTable ", result);
												res.send(result);
											})
											.catch((err) => {
												console.log('Error inside findJoinTable ', err);
											});
									})
									.catch((err) => {
										console.log('Error inside createJoinTable ', err);
									});
							})
							.catch((err) => {
								console.log('Error inside createBonfire ', err);
							});
					}
				})
				.catch((err) => {
						console.log('Error inside findBonfireByLocation ', err);
				});
		},
		put: (req, res) => {
			console.log('Received PUT at /api/bonfire/');
			res.end('Received PUT at /api/bonfire');
		},
		delete: (req, res) => {
			console.log('Received DELETE at /api/bonfire/');
			res.end('Received Delete at /api/bonfire');
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
			console.log(req.params, 'This is the params object in bonfires');

			// This function checks for the type of prop you are searching for
			var getParams = Helpers.checkParamsBonfire(req.params.bonfire_specs);

			if (Array.isArray(getParams)) {
				Bonfire.findBonfireByLocation(getParams[0], getParams[1])
					.then((bonfire) => {
						if (!bonfire) {
							console.log('Bonfire at ' + getParams + ' does not exist!');
							res.end('Bonfire at' + getParams + ' does not exist!');
						} else {
							console.log('Found the bonfire you are looking for!');
							res.send(bonfire);
						}
					})
					.catch((err) => {
						console.log('Error inside findBonfireByLocation ', err);
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
					})
					.catch((err) => {
						console.log('Error inside findBonfireById ', err);
				});
			}
		},
		post: (req, res) => {
			console.log('Recieved POST at api/bonfire');
			res.end('Recieved POST at api/bonfire');

		},
		put: (req, res) => {
			console.log('Received PUT at /api/bonfire/');
			res.end('Received PUT at /api/bonfire');
		},
		delete: (req, res) => {
			console.log('Received DELETE at /api/bonfire/');

			var getId = req.params.bonfire_specs;

			Bonfire.findBonfireById(getId)
				.then((bonfire) => {
					if (!bonfire) {
						console.log('There is not a bonfire with an ID of ' + getId);
						res.end('There is not a bonfire with an ID of ' + getId);
					} else {
						Bonfire.deleteBonfire(getId)
							.then((response) => {
								console.log(response + ' bonfire with an ID of ' + getId + ' was extinguished');
								res.end(response + ' bonfire with an ID of ' + getId + ' was extinguished');
							});
					}
				})
				.catch((err) => {
						console.log('Error inside findBonfireById ', err);
				});
		}
	}
};

