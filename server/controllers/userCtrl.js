const User = require('../models/userModel.js');
const Q = require('q');

module.exports = {
	'/': {
		get: (req, res) => {
			console.log("Received GET at /api/user/");
			res.end("Received GET at /api/user");
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
	},

	'/:userId': {
		get: (req, res) => {
			console.log("Received GET at /api/user/");
			res.end("Received GET at /api/user");
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
	},
};