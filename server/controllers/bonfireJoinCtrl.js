const User_Bonfire = require('../models/user_bonfireModel.js');

module.exports = {
  '/:bonfire_id': {
    get: function(req, res) {
      console.log("Received GET at /bonfire/join_bonfire");
      res.end("Received GET at /bonfire/join_bonfire");
    },
    post: function(req, res) {
      console.log("Received POST at /bonfire/join_bonfire");
      res.end("Received POST at /bonfire/join_bonfire");
    },
    put: function(req, res) {
      console.log("Received PUT at /bonfire/join_bonfire");

      var bonfireId = req.params.bonfire_id;
      var userId = req.body.id_Users;

      User_Bonfire.findJoinTable(bonfireId)
        .then((joinTable) => {
          if (!joinTable) {
            console.log("There is no join table with a bonfire ID of " + bonfireId);
            res.end("There is no join table with a bonfire ID of " + bonfireId)
          } else {
            User_Bonfire.joinBonfire(userId, bonfireId)
              .then((results) => {
                console.log('Result from user_bonfire controller', results);
                res.send(results);
              });
          }
        });
    },
    delete: function(req, res) {
      console.log("Received DELETE at /bonfire/join_bonfire");
      res.end("Received DELETE at /bonfire/join_bonfire");
    }
  }
};