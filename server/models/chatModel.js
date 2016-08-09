const db = require('../db/db.js');

const Chat = module.exports;

Chat.getAllChatMessages = (bonfireID) => {
  return db('Chats').where({
    id_Bonfires: bonfireID
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

Chat.createChatRoom = (attr) => {
  console.log(attr, 'attr')
  return new Promise((resolve, reject) => {
    return db('Chats').insert(attr)
      .then((result) => {
        attr.id = result[0];
        resolve(attr)
      });
  });
}