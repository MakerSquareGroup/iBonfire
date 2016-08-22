const Chat = require('../models/chatModel.js');
const User_Bonfire = require('../models/user_bonfireModel.js')

module.exports = {
  '/:bonfire_id': {
    get: (req, res) => {
      console.log('Received GET at /chat/:bonfire_id');
      Chat.findChatId(req.params.bonfire_id)
        .then((chatObj) => {
          const chatId = chatObj[0].id;
          Chat.getAllChatMessages(chatId)
            .then((messages) => {
              res.send(messages);
            })
            .catch((err) => {
              console.log("Error in getAllChatMessages at GET /chat/:bonfire_id", err)
              res.end(err)
            })
        })
        .catch((err) => {
          console.log("Error in findChatId at GET /chat/:bonfire_id", err)
          res.end("Error in findChatId at GET /chat/:bonfire_id", err)
        })
    },
    post: (req, res) => {
      console.log('Received POST at /chat/:bonfire_id');
      const message = req.body.message;
      const userId = req.body.FB_id;
      const name = req.body.name;
      if (req.body.chatId) {
        const chatId = req.body.chatId;
        Chat.addMessage({
            Chats_id: chatId,
            id_Users: userId,
            messages: message,
            name: name
          })
          .then((response) => {
            res.send(response);
          })
          .catch((err) => {
            console.log("Error adding message!", err);
            res.end("Error adding message!", err)
          })
      } else {
        Chat.findChatId(req.params.bonfire_id)
          .then((chatObj) => {
            let chatId = chatObj[0].id;
            Chat.addMessage({
                Chats_id: chatId,
                id_Users: userId,
                messages: message,
                name: name
              })
              .then((response) => {
                res.send(response);
              })
              .catch((err) => {
                console.log("Error in addMessage at POST /chat/:bonfire_id", err)
                res.end("Error in addMessage at POST /chat/:bonfire_id", err)
              })
          })
          .catch((err) => {
            console.log("Error in findChatId at POST /chat/:bonfire_id", err)
            res.end("Error in findChatId at POST /chat/:bonfire_id", err)
          })
      }
    },
    put: (req, res) => {
      console.log("Received PUT at /chat/:bonfire_id");
      res.end("Received PUT at /chat/:bonfire_id")
    },
    delete: (req, res) => {
      console.log("Received DELETE at /chat/:bonfire_id");
      res.end("Received DELETE at /chat/:bonfire_id")
    }
  }
}