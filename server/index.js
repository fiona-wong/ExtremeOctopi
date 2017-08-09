var data = require( '../database-mongo' );
var bodyParser = require( 'body-parser' );
var express = require( 'express' );

var app = express();

app.use( express.static( __dirname + '/../react-client/dist' ) );

// post request -login
  // connect to DB to check passward againt the user name
request.post('/login', (err, res, data) => {
	if (err) {console.error(err)}	
	
	//db.func
	res.status(201).send(JSON.parse(data))	
})

// post request -signup
	// send to DB user name/ password / full name / email
	request.post('/signup', (err, res, data) => {
	if (err) {console.error(err)}	
	
	//db.func
	res.status(201).send(JSON.parse(data))	
})

// post request -test
	// send to DB test results
request.post('/test', (err, res, data) => {
	if (err) {console.error(err)}	
	
		//db.func
	res.status(201).send(JSON.parse(data))	
})	

// post request messages
	// user id / friend id / message
	request.post('/message', (err, res, data) => {
	if (err) {console.error(err)}	
	
		//db.func
	res.status(201).send(JSON.parse(data))	
})	

// get request matching page
	// user table
	// matches
request('/matching', (req, res) => {
	if (err) {console.error(err)}	
	
	//db.func
	res.status(200).send(JSON.parse(req.body))	
})	

// get request profile page
	// user table
request('/profile', (req, res) => {
	if (err) {console.error(err)}	
	
	//db.func
	res.status(200).send(JSON.parse(req.body))	
})		
	

// get request messages
	// user id / friend id / message
request('/message', (req, res) => {
	if (err) {console.error(err)}	
	
	//db.func
	res.status(200).send(JSON.parse(req.body))	
})	


app.listen( 3000, function() {
  console.log( 'listening on port 3000!' );
} );

app.listen( 3000, function() {
  console.log( 'listening on port 3000!' );
} );



	/*

	NOTES:

	I added npm request to package.json

	*/