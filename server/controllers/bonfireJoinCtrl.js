const Bonfire = require('../models/bonfireModel.js');
const User = require('../models/userModel.js');

module.exports = {
  '/:bonfire_id': {
    get: function(req,res) {
      console.log("Received GET at /bonfire/join_bonfire");
      res.end("Received GET at /bonfire/join_bonfire");
    },
    post: function(req, res) {
      console.log("Received POST at /bonfire/join_bonfire");
      res.end("Received POST at /bonfire/join_bonfire");
    },
    put: function(req, res) {
      console.log("Received PUT at /bonfire/join_bonfire");
      
      

    },
    delete: function(req, res) {
      console.log("Received DELETE at /bonfire/join_bonfire");
      res.end("Received DELETE at /bonfire/join_bonfire");
    }
  }
};