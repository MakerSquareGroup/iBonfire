const controllers = require('../controllers/userCtrl.js');
const router = require('express').Router();

for (let route in controllers) {
	router.route(route)
		.get(controllers[route].get)
		.post(controllers[route].post)
		.put(controllers[route].put)
		.delete(controllers[route].delete);
}

module.exports = router;