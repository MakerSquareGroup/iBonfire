const User_Bonfire = require('../models/user_bonfireModel.js');
const Helpers = require('../helpers/ctrl_helpers.js');
const Chat = require('../models/chatModel.js');

module.exports = {
  // '/chat/:chat_id': {
  //   get: function(req, res) {
  //     // pass in params from client side that has the chat id
  //     var chat_id = req.params.chat_id;
  //     User_Bonfire.findBonfireChatMessages(chat_id)
  //   },
  //   post: function() {},
  //   put: function() {},
  //   delete: function() {},

  // },
  '/:passed_ids': {
    get: function(req, res) {
      console.log("Received GET at /bonfire/join_bonfire");

      let paramIds = Helpers.seperateParams(req.params.passed_ids);
      User_Bonfire.findUserBonfires(paramIds[0])
        .then((joinTable) => {
          if (!joinTable) {
            console.log("There is no join table with a user ID of " + paramIds[0]);
            res.end("There is no join table with a user ID of " + paramIds[0])
          } else {
            console.log('Resuslt from user_bonfire controller in findUserBonfires', joinTable);
            res.send(joinTable);
          }
        })
        .catch((err) => {
            console.log('Error inside findUserBonfires ', err);
        });
    },
    post: function(req, res) {
      console.log("Received POST at /bonfire/join_bonfire");
      res.end("Received POST at /bonfire/join_bonfire");
    },
    put: function(req, res) {
      console.log("Received PUT at /bonfire/join_bonfire");
      let paramIds = Helpers.seperateParams(req.params.passed_ids);
      User_Bonfire.findJoinTable(paramIds[1])
        .then((joinTable) => {
          if (!joinTable) {
            console.log("There is no join table with a bonfire ID of " + paramIds[0]);
            res.end("There is no join table with a bonfire ID of " + paramIds[0])
          } else {
            console.log(paramIds[0],paramIds[1], "JOINTABLE INSIDE PUT");
            User_Bonfire.checkIfUserExists(paramIds[0], paramIds[1])
              .then((result) => {
                if (result.length === 0) {
                  User_Bonfire.joinBonfire(paramIds[0], paramIds[1])
                    .then((results) => {
                      console.log('Result from user_bonfire controller in joinBonfire', results);
                      User_Bonfire.findBonfiresById(paramIds[1])
                        .then((results) => {
                          console.log('Result from user_bonfire controller in joinBonfire', results);
                          res.send(results);
                        })
                        .catch((err) => {
                            console.log('Error inside findAllBonfires ', err);
                        });
                    })
                    .catch((err) => {
                        console.log('Error inside joinBonfire ', err);
                    });
                } else {
                  console.log("The user with an id of " + paramIds[0] + " is already in the bonfire group with an id of " + paramIds[1]);
                  res.end("The user with an id of " + paramIds[0] + " is already in the bonfire group with an id of " + paramIds[1]);
                }
              })
              .catch((err) => {
                  console.log('Error inside checkIfUserExists ', err);
              });
          }
        })
        .catch((err) => {
            console.log('Error inside findJoinTable ', err);
        });
    },
    delete: function(req, res) {
      console.log("Received DELETE at /bonfire/join_bonfire");
      res.end("Received DELETE at /bonfire/join_bonfire");
    }
  },
  '/get_all_users/:bonfire_id': {
    get: function(req,res) {
      console.log("Received GET at /get_all_users");

      let bonfireId = req.params.bonfire_id;

      User_Bonfire.findAllUsers(bonfireId)
      .then((users) => {
        if(!users) {
          console.log("There is no bonfire with an id of " + bonfireId);
          res.end("There is no bonfire with an id of " + bonfireId);
        } else {
        console.log("All users for bonfire " + bonfireId);
        res.send(users);
        }
      })
      .catch((err) => {
        console.log('Error inside of findAllUsers: ', err);
        res.end(err);
      })
    },
    post: function(req, res) {
      console.log("Received POST at /get_all_users");
      res.end("Received POST at /get_all_users");
    },
    put: function(req, res) {
      console.log("Received PUT at /get_all_users");
      res.end("Received PUT at /get_all_users");
    },
    delete: function(req, res) {
      console.log("Received DELETE at /get_all_users");
      res.end("Received DELETE at /get_all_users");
    }
  },
  '/get_all_bonfires/:user_id': {
    get: function(req,res) {
      console.log("Received GET at /get_all_bonfires");

      let userId = req.params.user_id;

      User_Bonfire.findAllBonfires(userId)
      .then((bonfires) => {
        if(!bonfires) {
          console.log('The user with an id of ' + userId + ' has not joined any bonfires!');
          res.end('The user with an id of ' + userId + ' has not joined any bonfires!');
        } else {
          res.end('The user with an id of ' + userId + ' has joined: ', bonfires);
        }
      })
      .catch((err) => {
        console.log('Error in findAllBonfires: ', err);
        res.end('Error in findAllBonfires: ', err)
      })
    },
    post: function(req, res) {
      console.log("Received POST at /get_all_bonfires");
      res.end("Received POST at /get_all_bonfires");
    },
    put: function(req, res) {
      console.log("Received PUT at /get_all_bonfires");
      res.end("Received PUT at /get_all_bonfires");
    },
    delete: function(req, res) {
      console.log("Received DELETE at /get_all_bonfires");
      res.end("Received DELETE at /get_all_bonfires");
    }
  }
};
