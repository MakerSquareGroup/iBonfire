const moment = require('moment');

module.exports = (io) => {
  io.on('connect', (socket) => {
    socket.once('disconnect', () => {
      console.log('Disconnected.');
    });

    socket.on('joinChat', (bonfireId) => {
      console.log('Joined room ' + bonfireId);
      socket.emit('Received socket id of: ', socket.id);
      socket.join('Room' + bonfireId);
    });

    socket.on('leaveChat', (bonfireId) => {
      console.log('Leaving room ' + bonfireId);
      socket.leave('Room' + bonfireId);
    });

    socket.on('newMessage', (msg) => {
      console.log('Message received ' + msg.messages);
      msg.created_by_User_at = moment().valueOf();
      socket.broadcast.to('room' + msg.room).emit('message', msg);
    });
  });
}