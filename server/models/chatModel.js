const db = require('../db/db.js');

const Chat = module.exports;

Chat.getAllChatMessages = (id_Chat) => {
  return db('Messages').where({
    Chats_id: id_Chat
  })
  .then((rows) => {
    return rows;
  });
};

Chat.addMessage = (attr) => {
  return db('Messages').insert(attr)
    .then((result) => {
      attr.id = result[0];
      return result;
  });
};

Chat.createChatRoom = (bonId) => {
  return db('Chats').insert({ id_Bonfires: bonId })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err, 'Error creating chat room!');
  });
};

Chat.findChatId = (bonId) => {
  return db('Chats').where({ id_Bonfires: bonId })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err, "Error finding chatId!")
    })
};