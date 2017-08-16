var db = require( '../database-mongo' );
var bodyParser = require( 'body-parser' );
var express = require( 'express' );

var app = express();

app.use( express.static( __dirname + '/../react-client/dist' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: true}) );

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
	db.postGetMatches(req.body.username, req.body.numberToReturn, req.body.limit, req.body.testResults, (results) => {
		res.status(201).send(results);
	});	
})

app.post('/message', (req, res) => {
	db.postMessage(req.body.sender, req.body.receiver, req.body.message, () => {
		res.status(201).end();	
	});	
})

app.get('/profile', (req, res) => {
	db.getProfile(req.body.username, (profile) => {
		res.status(200).send(JSON.stringify(profile));	
	})
})		

app.get('/matches', (req, res) => {
	db.getFriends(req.body.username, (matches) => {
		res.status(200).send(JSON.stringify(matches));	
	})
})	

	
app.get('/message', (req, res) => {
	db.getMessages(req.body.username, (messageObj) =>{
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
});



module.exports = app;