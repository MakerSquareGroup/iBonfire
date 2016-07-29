const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const moment = require('moment');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Uncomment after creating database and setting uername and password in the 
//.env-sample file. Once that is done rename the file to just .env

const dotenv = require('dotenv');

const db = require('./db/db.js');

// Require routes for enpoints
const userRoutes = require('./routes/userRoutes.js');
const bonfireRoutes =require('./routes/bonfireRoutes.js');

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static('./client'));

app.use(cors());

// Routes for endpoints
app.use('api/user', userRoutes);
app.use('api/bonfire', bonfireRoutes);

app.get('*', (request, response) => {
	response.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
	db.ensureSchema();
	console.log(moment().format('h:mm:ss a') + ': Server is Listening on port', app.get('port'));
});