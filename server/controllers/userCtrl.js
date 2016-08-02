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
				location: req.body.location,
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
			console.log(req.params, "This is the params object in users");

			// This function checks for the type of prop you are searching for
			var getParams = checkParamsUser(req.params.user_specs);

			if (Array.isArray(getParams)) {
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
			} else {
				User.findUserById(getParams)
					.then((user) => {
					if (!user) {
							console.log('User with Facebook ID ' + getParams + ' does not exist!');
							res.end('User with Facebook ID' + getParams + ' does not exist!');
						} else {
							console.log('Found the user you are looking for!');
							res.send(user);
						}
					});
			}
		},
		post: (req, res) => {
			console.log("Received POST at /api/user/");
			res.end("Received POST at /api/user");
		},
		put: (req, res) => {
			console.log("Received PUT at /api/user/");
			res.end("Received PUT at /api/user");
		},
		delete: (req, res) => {
			console.log("Received DELETE at /api/user/");
			res.end("Received Delete at /api/user");
		}
	}
};

// The below functions, checkParamUser and seperateLatLongUser are used to determine the proper endpoint
// based on coordinates or Facebook ID

checkParamsUser = getParams => {
	var reg = /[&]/g;
	if (getParams.match(reg)) {
		console.log("This GET request is for a user at a coordinate");
		return seperateLatLongUser(getParams);
	} else {
		console.log("This GET request finds a user based on FB_id");
		return getParams;
	}
};

seperateLatLongUser = getParams => {
	var reg = /[&]/;
	var coords = getParams.split(reg);

	return coords;
};