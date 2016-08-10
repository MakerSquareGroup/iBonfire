const db = require('../db/db.js');

const Chat = module.exports;

Chat.getAllChatMessages = (id_Chat) => {
  return db('Messages').where({
    Chats_id: id_Chat
  })
  .then((rows) => {
    return rows;
  })
}

Chat.addMessage = (attr) => {
  return new Promise((resolve, reject) => {
    return db('Messages').insert(attr)
      .then((result) => {
        attr.id = result[0];
        resolve(attr)
      });
  });
};

// should happen when the bonfire is made. 

Chat.createChatRoom = (attr) => {
  console.log(attr, 'attr')
  return new Promise((resolve, reject) => {
    return db('Chats').insert(attr)
      .then((result) => {
        console.log(result, 'ARE YOU ON LINE 29????')
        attr.id = result[0];
        resolve(attr)
      })
      .catch((err) => {
        console.log(err, ': error on line 36 in createChatroomModel')
      })

  });
}