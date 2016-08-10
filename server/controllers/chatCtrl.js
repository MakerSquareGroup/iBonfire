const Chat = require('../models/chatModel.js');

module.exports = {
  '/': {
    post: (req, res) => {
      console.log('Received POST at /bonfireChat')
      const newMessage = {
        messages: req.body.messages,
        id_Users: req.body.id_Users,
        Chats_id: req.body.Chats_id
      }

      Chat.addMessage(newMessage)
        .then((message) => {

            const chatIDs = {
              id_Bonfires: req.body.id_Bonfires,
              id_Messages: message.id
            }
            console.log(chatIDs, 'what is chatIDs')
            // Chat.createChatRoom(chatIDs)
            //   .then((response) => {
            //     console.log('Chat Room with id of: ', response.id, ' has been created');
            //     res.send(response)
            //   })
            //   .catch((err) => {
            //     console.log(err, ': error inside of addMessage model')
            //   })
          })
      },
    get: (req,res) => {
      console.log('Received GET at /bonfireChat')
      Chat.getAllChatMessages(12342523)
        .then((bonfireChat) => {
          console.log(bonfireChat)
          res.send(message)
        });
    }
  }
}
