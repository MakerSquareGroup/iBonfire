const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const moment = require('moment');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Uncomment after creating database and setting uername and password in the 
//.env-sample file. Once that is done rename the file to just .env

const dotenv = require('dotenv').config();

const db = require('./db/db.js');

// Require routes for enpoints
const userRoutes = require('./routes/userRoutes.js');
const bonfireRoutes = require('./routes/bonfireRoutes.js');
const bonfireJoinRoutes = require('./routes/bonfireJoinRoutes.js');

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static('./client'));
app.use(express.static(__dirname + '/../client/public'));

app.use(cors());

// Routes for endpoints
app.use('/user', userRoutes);
app.use('/bonfire', bonfireRoutes);
app.use('/bonfire/join_bonfire', bonfireJoinRoutes);

// Route for API endpoint
// app.use('/api/bonfire/location', bonfireApiRoutes);

app.get('/*', function(req,res){
  res.sendFile(path.resolve('client', 'index.html'));
})

//Scraping
// var fs = require('fs');
// var request = require('request');
// var cheerio = require('cheerio');


// app.get('/scrape', function(req, res){
	
// 	url = 'https://www.facebook.com/SeanMichaeLester/friends?ref=br_rs&source_ref=pb_friends_tl';
//     request(url, function(error, response, html){
		
// 		if(!error){

//            var $ = cheerio.load(html);
//            $('div').each(function(index){
//            		console.log(index, "div index");
//            })
//            $('.fsl').each(function(index){
//            	console.log(index, "index");
//            })
//            $('div.fsl.fwb.fcb').each(function(index){
//            		console.log('heres a element');
//            })
         
       
//         }
//     })
  
// })

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
	db.ensureSchema();
	console.log(moment().format('h:mm:ss a') + ': Server is Listening on port', app.get('port'));
});




