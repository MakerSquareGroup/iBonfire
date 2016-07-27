const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const moment = require('moment');
const path = require('path');
const cors = require('cors');

const app = express();

// Uncomment dotenv after creating  the database and setting uername 
// and password in the .env-sample file. Once that is done rename the file to just .env
// const dotenv = require('dotenv');

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static('../client'));

// Using the cors npm in this way enables all cors requests
app.use(cors());

// Routes for endpoints
app.use('api/user', userRoutes);
// app.use('api/bonfire', bonfireRoutes);
app.use('api/location', locationRoutes);

app.get('/', (request, response) => {
	response.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), function() {
	console.log(moment().format('h:mm:ss a') + ': Server is Listening on port', app.get('port'));
});