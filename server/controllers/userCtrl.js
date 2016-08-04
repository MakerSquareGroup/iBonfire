const User = require('../models/userModel.js');
const Q = require('q');

module.exports = {
	'/': {
		get: (req, res) => {
			console.log("Received GET at /api/user/");

			User.findAllUsers()
				.then((users) => {
					if (users.length === 0) {
						console.log('There are no users');
						res.end('There are no users');
					} else {
						console.log('We got users!')
						res.send(users);
					}
				});
		},
		post: (req, res) => {
			console.log("Received POST at /api/user/");

			var newUser = {
				name: req.body.name,
				latitude: req.body.latitude,
				longitude: req.body.longitude,
				cityState: req.body.cityState,
				FB_id: req.body.FB_id,
				FB_img: req.body.FB_img,
				FB_timeline: req.body.FB_timeline
			};

			User.findUserById(newUser.FB_id)
				.then((user) => {
					console.log(user);
					if (user) {
						console.log('User already exists!');
						res.end('User already exists!');
					} else {
						User.createUser(newUser)
							.then((result) => {
								console.log('Result from user controller', results);
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

	// User specs can be in the form of FB_id or latitude&longitude so that a user can be searched by either id or coordinates
	// For example:

	// Search by FB_id:
	// /api/user/115548485

	// Search by coordinates
	// /api/user/34.024212&-118.496475

	'/:user_specs': {
		get: (req, res) => {
			console.log("Received GET at /api/user/");

			
			var matchParams = req.params.user_specs;

			// These function checks for the type of prop you are searching for

			var getParams = checkParamsUser(req.params.user_specs);
			var userBonfires = checkParamsUserBonfires(req.params.user_specs);

			if (matchParams.match("=")) {
				User.findUserBonfires(userBonfires.FB_ID)
					.then((bonfires) => {
						if (!bonfires) {
							console.log('User with Facebook ID ' + userBonfires + ' has not lit any bonfires!');
							res.end('User with Facebook ID ' + userBonfires + ' has not lit any bonfires!');
						} else {
							console.log('Here are the users bonfires!');
							res.send(bonfires);
						}
					})

					return;
			}

			if (matchParams.match("&")) {
				User.findUserByLocation(getParams[0], getParams[1])
					.then((user) => {
						if (!user) {
							console.log('User at ' + getParams + ' does not exist!');
							res.end('User at' + getParams + ' does not exist!');
						} else {
							console.log('Found the user you are looking for!');
							res.send(user);
						}
					});	
			}

			if (typeof getParams === 'string') {
				User.findUserById(getParams)
					.then((user) => {
						if (!user) {
							console.log('User with Facebook ID ' + getParams + ' does not exist!');
							res.end('User with Facebook ID ' + getParams + ' does not exist!');
						} else {
							console.log('Found the user you are looking for!');
							res.send(user);
						}
					});
			}
		},
		post: (req, res) => {
			console.log('Received POST at /api/user/');
			res.end('Received POST at /api/user');
		},
		put: (req, res) => {
			console.log('Received PUT at /api/user/');
			res.end('Received PUT at /api/user');
		},
		delete: (req, res) => {
			console.log('Received DELETE at /api/user/');
			res.end('Received Delete at /api/user');
		}
	}
};

// The below functions, checkParamUser and seperateLatLongUser are used to determine the proper endpoint
// based on coordinates or Facebook ID

checkParamsUser = getParams => {
	var reg = /[&]/;
	if (getParams.match(reg)) {
		console.log('This GET request is for a user at a coordinate');
		return seperateLatLongUser(getParams);
	} else {
		console.log('This GET request finds a user based on FB_id');
		return getParams;
	}
};

checkParamsUserBonfires = userBonfires => {
	var reg = /[=]/;
	if (userBonfires.match(reg)) {
		console.log('This GET request is for returning all bonfires by user id');
		return (seperateUserBonfire(userBonfires));
	} else {
		return userBonfires;
	}
};

seperateLatLongUser = getParams => {
	var reg = /[&]/;
	var coords = getParams.split(reg);

	return coords;
};

// This function is made to be scalable. Currently it will seperate out only the user ID
// and returns all bonfires associatewd with that user, however, it can be expanded to 
// accept other arguments to filter results i.e.: by location.

seperateUserBonfire = userId => {
	var reg = /[=]/;
	var passedInProps = userId.split(reg);

	return {"FB_ID": passedInProps[0], "Filter": passedInProps[1]};
};

