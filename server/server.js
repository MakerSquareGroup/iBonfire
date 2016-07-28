const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const moment = require('moment');
const path = require('path');

const app = express();

//Uncomment after creating database and setting uername and password in the 
//.env-sample file. Once that is done rename the file to just .env

//const dotenv = require('dotenv');

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static('./client'));

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name');
	next();
});

// Routes for endpoints
// app.use('api/user', userRoutes);
// // app.use('api/bonfire', bonfireRoutes);
// app.use('api/location', locationRoutes);

app.get('*', (request, response) => {
	response.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), function() {
	console.log(moment().format('h:mm:ss a') + ': Server is Listening on port', app.get('port'));
});