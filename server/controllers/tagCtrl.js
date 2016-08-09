var Tag = require('../models/tagModel.js');

module.exports = {
  '/': {
    get: function(req,res) {
      console.log("Received GET at /tag");
      res.end("Received GET at /tag");
    },
    post: function(req, res) {
      console.log("Received POST at /tag");
      res.end("Received POST at /tag");
    },
    put: function(req, res) {
      console.log("Received PUT at /tag");
      res.end("Received PUT at /tag");
    },
    delete: function(req, res) {
      console.log("Received DELETE at /tag");
      res.end("Received DELETE at /tag");
    }
  }
};