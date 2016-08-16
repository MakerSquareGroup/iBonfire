const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const moment = require('moment');
const express = require('express');
const bodyParser = require('body-parser');
const express_enforces_ssl = require('express-enforces-ssl');
const contentLength = require('express-content-length-validator');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
require('./sockets/socketHelper')(io);

// For database access and creation.
const dotenv = require('dotenv').config();
const db = require('./db/db.js');

// Require routes for enpoints.
const tagRoutes = require('./routes/tagRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const bonfireRoutes = require('./routes/bonfireRoutes.js');
const bonfireJoinRoutes = require('./routes/user_bonfireRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static('./client'));
app.use(express.static(__dirname + '/../client/public'));

// Below are numerous middlewares that focus on security concerns such as payload and XXS attacks and securing headers for requests.

// Reduces vulnerabilities to large payload attacks
app.use(contentLength.validateMax());

// Enforces HTTPs connections on incoming requests. Use when deployed.
// app.enable('trust proxy');
// app.use(express_enforces_ssl());

// Middleware for setting headers.
app.use(cors());

// Middleware that sets HTTP headers for various concerns.
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen())
app.use(helmet.noSniff())

// End of security middleware.

// Routes for endpoints
app.use('/tag', tagRoutes);
app.use('/user', userRoutes);
app.use('/bonfire', bonfireRoutes);
app.use('/bonfire/join_bonfire', bonfireJoinRoutes);
app.use('/chat', chatRoutes);

app.get('*', (req,res) => {
  res.sendFile(path.resolve('client', 'index.html'));
});

app.set('port', process.env.PORT || 8080);

http.listen(app.get('port'), () => {
  db.ensureSchema();
  console.log(moment().format('h:mm:ss a') + ': Server is Listening on port', app.get('port'));
});