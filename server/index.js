var db = require( '../database-mongo' );
var bodyParser = require( 'body-parser' );
var express = require( 'express' );

var request = require( 'request' );
var authentication = require( './authentication/authentication.js' );
var cookies = require( './authentication/cookies.js' );
// require authentication

var app = express();

app.use( express.static( __dirname + '/../react-client/dist' ) );
app.use( bodyParser.urlencoded({extended: true}) );
app.use( bodyParser.json() );
app.use( cookies.parseCookies );
app.use( cookies.createSession );

app.post('/login', (req, res) => {	
		res.status(201).end();	
})

app.post('/signup', (req, res) => {
	res.status(201).end();	
})

app.post('/test', (req, res) => {
	db.postTestResults(req.body.username, req.body.results, () => {	
		res.status(201).end();	
	});
})	

app.post('/matches', (req, res) => {
	db.postMatches(req.body.username, req.body.testResults, () => {
		res.status(201).end();	
	});	
})

app.post('/message', (req, res) => {
	db.postMessage(req.body.sender, req.body.receiver, req.body.message, () => {
		res.status(201).end();	
	});	

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

app.get('/matches', (req, res) => {
	db.getMatches(req.body.username, (matches) => {
		res.status(200).send(JSON.stringify(matches));	
	})
})	

	
app.get('/message', (req, res) => {
	db.getMessages(req.body.user, (messageObj) =>{
		res.status(200).send(JSON.stringify(messageObj));	
	})
})	

//keep this at last
//redirects 404 to index.html
app.all('*', (req, res) => {
	res.redirect('/')
})	

app.listen( 8080, function() {
  console.log( 'listening on port 8080!' );
} );


module.exports = app;