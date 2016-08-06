var Tag = require('../models/tagModel.js');

module.exports = {
  '/:userId': {
    get: function(req,res) {
      console.log("Received GET at /:tagname");
      res.end("Received GET at /:tagname");
    },
    post: function(req, res) {
      console.log("Received POST at /:tagname");
      res.end("Received POST at /:tagname");
    },
    put: function(req, res) {
      console.log("Received PUT at /:tagname");
      res.end("Received PUT at /:tagname");
    },
    delete: function(req, res) {
      console.log("Received DELETE at /:tagname");
      res.end("Received DELETE at /:tagname");
    }
  }
};