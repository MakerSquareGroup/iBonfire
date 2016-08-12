const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const moment = require('moment');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//Uncomment after creating database and setting uername and password in the 
//.env-sample file. Once that is done rename the file to just .env

const dotenv = require('dotenv').config();

const db = require('./db/db.js');

// Require routes for enpoints
const tagRoutes = require('./routes/tagRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const bonfireRoutes = require('./routes/bonfireRoutes.js');
const bonfireJoinRoutes = require('./routes/user_bonfireRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static('./client'));
app.use(express.static(__dirname + '/../client/public'));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('new message', function(msg){
    socket.broadcast.emit('receive-message', msg);
  });
});

app.use(cors());

// Routes for endpoints
app.use('/tag', tagRoutes);
app.use('/user', userRoutes);
app.use('/bonfire', bonfireRoutes);
app.use('/bonfire/join_bonfire', bonfireJoinRoutes);
app.use('/chat', chatRoutes);

// Route for API endpoint
// app.use('/api/bonfire/location', bonfireApiRoutes);

app.get('/*', function(req,res){
  res.sendFile(path.resolve('client', 'index.html'));
})

app.set('port', process.env.PORT || 8080);

http.listen(app.get('port'), () => {
	db.ensureSchema();
	console.log(moment().format('h:mm:ss a') + ': Server is Listening on port', app.get('port'));
});




