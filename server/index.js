var authentication = require( './authentication/authentication.js' );
var cookies = require( './authentication/cookies.js' );
var bodyParser = require( 'body-parser' );
var db = require( '../database-mongo' );
var express = require( 'express' );

var request = require( 'request' );
var authentication = require( './authentication/authentication.js' );
var cookies = require( './authentication/cookies.js' );

var app = express();

app.use( express.static( __dirname + '/../react-client/dist' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
app.use( cookies.parseCookies );
app.use( cookies.createSession );

app.get( '/profile', ( req, res ) => {
  cookies.verifySession( req, res, ( valid ) => {
    if ( valid ) {
      db.getProfile( req.session.username, ( profile ) => {
        res.status( 200 ).end( JSON.stringify( profile ) );
      } )
    } else {
      console.log( 'invalid', req.session );
      res.status( 200 ).end( JSON.stringify( false ) );
    }
  } );
} );

app.get( '/matches', ( req, res ) => {
  cookies.verifySession( req, res, ( valid ) => {
    if ( valid ) {
      db.getFriends( req.session.username, ( matches ) => {
        res.status( 200 ).send( JSON.stringify( matches ) );
      } );
    } else {
      res.status( 200 ).end( JSON.stringify( false ) );
    }
  } );
} );

app.get( '/message', ( req, res ) => {
  cookies.verifySession( req, res, ( valid ) => {
    if ( valid ) {
      db.getMessages( req.session.username, ( messages ) => {
        res.status( 200 ).send( JSON.stringify( messages ) );
      } );
    } else {
      res.status( 200 ).end( JSON.stringify( false ) );
    }
  } );
} );

app.post( '/signup', ( req, res ) => {
  console.log( req.session );

  var newUser = {
    username: req.body.username,
    password: authentication.generateHash( req.body.password ),
    fullname: req.body.fullname,
    email: req.body.email,
  };

  db.postUser( newUser, req.cookies.takoyaki, ( valid ) => {
    if ( valid ) {
      res.cookie( 'takoyaki', req.cookies.takoyaki ).status( 201 ).end( JSON.stringify( true ) );
    } else {
      res.status( 201 ).end( JSON.stringify( false ) );
    }
  } )
} );

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
} );

module.exports = app;