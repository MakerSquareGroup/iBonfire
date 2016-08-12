const Chat = require('../models/chatModel.js');
const User_Bonfire = require('../models/user_bonfireModel.js')

module.exports = {
  '/': {
    post: (req, res) => {
      console.log('Received POST at /chat')
    },
    get: (req,res) => {
      console.log('Received GET at /chat')
    },
    put: (req, res) => {
      console.log("Received PUT at /chat");
    },
    delete: (req, res) => {
      console.log("Received DELETE at /chat!")
    }
  },
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
        })
    },
    post: (req, res) => {
      console.log('Received POST at /chat/:bonfire_id');
      const message = req.body.message;
      const userId = req.body.FB_id;
      const name = req.body.name;
      if(req.body.chatId) {
        const chatId = req.body.chatId;
        Chat.addMessage({ Chats_id: chatId, id_Users: userId, messages: message, name: name })
        .then((response) => {
          res.send(response);
        })
        .catch((err) => {
          console.log(err, "Error adding message!");
        })
      } else {
        Chat.findChatId(req.params.bonfire_id)
        .then((chatObj) => {
          let chatId = chatObj[0].id;
          Chat.addMessage({ Chats_id: chatId, id_Users: userId, messages: message, name: name })
          .then((response) => {
            res.send(response);
          })
        })
      }
    },
    put: (req, res) => {
      console.log("Received PUT at /chat/:bonfire_id");
    },
    delete: (req, res) => {
      console.log("Received DELETE at /chat/:bonfire_id");
    }
  }
}