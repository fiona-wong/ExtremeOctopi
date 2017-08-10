//main.js
var db = require( '../database-mongo' );
var body = require( 'body-parser' );
var express = require( 'express' );

var app = express();

app.use( express.static( __dirname + '/../react-client/dist' ) );


// wating for authentication
app.post('/login', (req, res) => {

  res.status(201).send(JSON.stringify(true));

})

app.post('/signup', (req, res) => {
  db.postCookie(req.body.cookie, (bool) => {
    db.postUser(req.body.userInfo, req.body.cookie, (response) => {
      res.status(201).send(JSON.stringify(response));
    })
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
    res.status(200).send(JSON.parse(matches));
  })
})

app.get('/profile', (req, res) => {
  db.getProfile(req.body.username, (profile) => {
    res.status(200).send(JSON.parse(profile));
  })
})

app.get('/message', (req, res) => {
  db.getMessages(req.body.user, (messageObj) =>{
    res.status(200).send(JSON.parse(messageObj));
  })
})


app.listen( 8080, function() {
  console.log( 'listening on port 8080!' );
} );

