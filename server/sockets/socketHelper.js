const moment = require('moment');

module.exports = (io) => {
  io.on('connect', (socket) => {
    socket.once('disconnect', () => {
      console.log('Disconnected.');
    });

    socket.on('joinChat', (joinObj) => {
      console.log('Joined room ' + joinObj.bonId);
      socket.emit('Received socket id of: ', socket.id);
      socket.join('Room' + joinObj.bonId);
      let clients = io.sockets.adapter.rooms['Room' + joinObj.bonId];
      console.log('CLIENTS *********', clients);
    });

    socket.on('leaveChat', (bonfireId) => {
      console.log('Leaving room ' + bonfireId);
      socket.leave('Room' + bonfireId);
    });

    socket.on('newMessage', (msg) => {
      console.log('Message received ' + msg.messages);
      msg.created_by_User_at = moment().valueOf();
      socket.to(msg.room).emit('message', msg);
    });
  });
}