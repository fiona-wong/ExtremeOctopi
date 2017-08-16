
//main.js
var db = require( '../database-mongo' );
var body = require( 'body-parser' );
var express = require( 'express' );
var request = require( 'request' );
var authentication = require( './authentication/authentication.js' );
var cookies = require( './authentication/cookies.js' );
// require authentication

var app = express();

app.use( express.static( __dirname + '/../react-client/dist' ) );
app.use( cookies.parseCookies );
app.use( cookies.createSession );


//wating for authentication
app.post('/login', (req, res) => {
	res.status(201).send(JSON.stringify(data));	
})

app.post('/signup', (req, res) => {
	db.postUser(req.body, (bool) => {
		res.status(201).send(JSON.stringify(bool));	
	})	
})

app.post('/test', (req, res) => {
	db.postTestResults(req.body.username, req.body.results);
})	

app.post('/message', (req, res) => {
	db.postMessage(req.body.sender, req.body.receiver, req.body.message);	
})	

app.post('/matches', (req, res) => {
	db.postMatches(req.body.username, req.body.testResults);	
})


app.get('/matches', (req, res) => {
	db.getMatches(req.body.username, (matches) => {
		res.status(200).send(JSON.stringify(matches));	
	})
})	

app.get('/profile', (req, res) => {
	db.getProfile(req.body.username, (profile) => {
		res.status(200).send(JSON.stringify(profile));	
	})
})		
	
app.get('/message', (req, res) => {
	db.getMessages(req.body.user, (messageObj) =>{
		res.status(200).send(JSON.stringify(messageObj));	
	})
})	


app.listen( 3000, function() {
  console.log( 'listening on port 3000!' );
} );



	/*

	NOTES:

	Lara added npm request to package.json

	*/