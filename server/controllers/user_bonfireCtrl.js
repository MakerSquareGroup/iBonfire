const User_Bonfire = require('../models/user_bonfireModel.js');

module.exports = {
  '/:passed_ids': {
    get: function(req, res) {
      console.log("Received GET at /bonfire/join_bonfire");
      
      var paramIds = seperateBonfireUserId(req.params.passed_ids);
      
      User_Bonfire.findUserBonfires(paramIds[0])
      .then((joinTable) => {
        if(!joinTable) {
          console.log("There is no join table with a bonfire ID of " + paramIds[0]);
          res.end("There is no join table with a bonfire ID of " + paramIds[0])
        } else {
          console.log('Result from user_bonfire controller in findUserBonfires', joinTable);
          res.send(joinTable);
        }
      })
    },
    post: function(req, res) {
      console.log("Received POST at /bonfire/join_bonfire");
      res.end("Received POST at /bonfire/join_bonfire");
    },
    put: function(req, res) {
      console.log("Received PUT at /bonfire/join_bonfire");

      var paramIds = seperateBonfireUserId(req.params.passed_ids);

      User_Bonfire.findJoinTable(paramIds[0])
        .then((joinTable) => {
          if (!joinTable) {
            console.log("There is no join table with a bonfire ID of " + paramIds[0]);
            res.end("There is no join table with a bonfire ID of " + paramIds[0])
          } else {
            User_Bonfire.joinBonfire(paramIds[1], paramIds[0])
              .then((results) => {
                console.log('Result from user_bonfire controller in joinBonfire', results);
                User_Bonfire.findBonfiresById(paramIds[0])
                .then((results) => {
                  console.log('Result from user_bonfire controller in joinBonfire', results);
                  res.send(results);
                })
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

seperateBonfireUserId = (getParams) => {
  var reg = /[&]/;
  var coords = getParams.split(reg);

  return coords;
};


// Example PUT for users to join a bonfire

// Endpoint: localhost:8080/bonfire/join_bonfire/*bonfireID*&*FB_ID*
// Endpoint: localhost:8080/bonfire/join_bonfire/10&4294967295

// Returns the join table ID