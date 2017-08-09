var db = require( '../database-mongo' );
var body = require( 'body-parser' );
var express = require( 'express' );

var app = express();

app.use( express.static( __dirname + '/../react-client/dist' ) );


// wating for authentication
request.post('/login', (req, res) => {
		//db.func
		res.status(201).send(JSON.parse(data));	
})

	// wating for authentication
	request.post('/signup', (req, res) => {
		//db.func
		res.status(201).send(JSON.parse(data));	
})

request.post('/test', (req, res) => {
	db.testResults(req.body.username, req.body.results);
})	

request.post('/message', (req, res) => {
	db.postMessage(req.body.sender, req.body.receiver, req.body.message);	
})	

request.get('/matching', (req, res) => {
	db.getMatches(req.body.username, (matches) => {
		res.status(200).send(JSON.parse(matches));	
	})
})	

request.get('/profile', (req, res) => {
	db.getProfile(req.body.username, (profile) => {
		res.status(200).send(JSON.parse(profile));	
	})
})		
	
request.get('/message', (req, res) => {
	db.getMessages(req.body.user, (messageObj) =>{
		res.status(200).send(JSON.parse(messageObj));	
	})
})	


app.listen( 3000, function() {
  console.log( 'listening on port 3000!' );
} );



	/*

	NOTES:

	I added npm request to package.json

	*/