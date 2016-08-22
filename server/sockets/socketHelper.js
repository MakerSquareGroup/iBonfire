const moment = require('moment');

let clients = [];

module.exports = (io) => {
  io.on('connect', (socket) => {
    socket.once('disconnect', () => {
      console.log('Disconnected.');
    });

    socket.on('joinChat', (params) => {
      console.log('Joined room ' + params.bonId);
      if(clients.indexOf(params.name) === -1) {
        clients.push(params.name);
      }
      socket.emit('Received socket id of: ', socket.id);
      socket.join(params.bonId);
      console.log('Connected clients:', clients);
    });

    socket.on('leaveChat', (bonfireId) => {
      console.log('Leaving room ' + bonfireId);
      socket.leave(bonfireId);
    });

    socket.on('newMessage', (msg) => {
      console.log('Message received ' + msg.messages);
      msg.created_by_User_at = moment().valueOf();
      socket.to(msg.room).emit('message', msg);
    });
  });
}