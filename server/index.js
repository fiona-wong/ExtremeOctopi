var authentication = require( './authentication/authentication.js' );
var cookies = require( './authentication/cookies.js' );
var bodyParser = require( 'body-parser' );
var db = require( '../database-mongo' );
var express = require( 'express' );

var request = require( 'request' );
var authentication = require( './authentication/authentication.js' );
var cookies = require( './authentication/cookies.js' );
// require authentication

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
  var newUser = {
    username: req.body.username,
    password: authentication.generateHash( req.body.password ),
    fullname: req.body.fullname,
    email: req.body.email,
  };

  cookies.parseCookies( req, res, () => {
    db.postUser( newUser, req.cookies.takoyaki, ( valid ) => {
      if ( valid ) {
        cookies.createSession( req, res, () => {
          res.status( 201 ).end( JSON.stringify( true ) );
        } );
      } else {
        res.status( 201 ).end( JSON.stringify( false ) );
      }
    } );
  } );
} );

//Currently, if the user has valid cookies and the code works, the user shouldn't have to log in
//!!!!! We need a way to update the cookie in the database if the user clears their cookie !!!!!
//Right now the user can't get a valid session if they ever lose their cookie
app.post( '/login', ( req, res ) => {
  db.getHash( req.body.username, ( password ) => {
    if ( authentication.authenticate( req.body.password, password ) ) {
      cookies.parseCookies( req, res, () => {
        //Update the database here using the parsed cookies. req.cookies.takoyaki

        cookies.createSession( req, res, () => {
          res.status( 201 ).end( JSON.stringify( true ) );
        } );
      } );
    } else {
    	res.status( 201 ).end( JSON.stringify( false ) );
    }
  } );
} );

app.post( '/test', ( req, res ) => {
	db.postTestResults( req.session.username, req.body.results, () => {
		res.status( 201 ).end();
	} );
} );

app.post( '/matches', ( req, res ) => {
	db.postMatches( req.session.username, req.body.testResults, () => {
		res.status( 201 ).end();
	} );
} );

app.post( '/message', ( req, res ) => {
	db.postMessage( req.session.username, req.body.receiver, req.body.message, () => {
		res.status( 201 ).end();
	} );	
} );

app.all( '*', ( req, res ) => {
	res.redirect( '/' )
} );

app.listen( 8080, function() {
  console.log( 'listening on port 8080!' );
} );

module.exports = app;