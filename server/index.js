
var db = require( '../database-mongo' );
var body = require( 'body-parser' );
var express = require( 'express' );
var request = require( 'request');
// require authentication

var app = express();

app.use( express.static( __dirname + '/../react-client/dist' ) );


// //wating for authentication
// request.post('/login', (req, res) => {
		
// 		res.status(201).send(JSON.parse(data));	
// })

// request.post('/signup', (req, res) => {
// 	postUser(req.body, (bool) => {
// 		res.status(201).send(JSON.parse(bool));	
// 	})	
// })

// request.post('/test', (req, res) => {
// 	db.postTestResults(req.body.username, req.body.results);
// })	

// request.post('/message', (req, res) => {
// 	db.postMessage(req.body.sender, req.body.receiver, req.body.message);	
// })	

// request.post('/matches', (req, res) => {
// 	db.postMatches(req.body.username, req.body.testResults);	
// })


// request.get('/matches', (req, res) => {
// 	db.getMatches(req.body.username, (matches) => {
// 		res.status(200).send(JSON.parse(matches));	
// 	})
// })	

// request.get('/profile', (req, res) => {
// 	db.getProfile(req.body.username, (profile) => {
// 		res.status(200).send(JSON.parse(profile));	
// 	})
// })		
	
// request.get('/message', (req, res) => {
// 	db.getMessages(req.body.user, (messageObj) =>{
// 		res.status(200).send(JSON.parse(messageObj));	
// 	})
// })	


app.listen( 3000, function() {
  console.log( 'listening on port 3000!' );
} );



	/*

	NOTES:

	Lara added npm request to package.json

	*/