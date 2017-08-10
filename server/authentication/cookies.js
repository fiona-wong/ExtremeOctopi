const crypto = require( 'crypto' );
const Promise = require( 'bluebird' );
const Database = require( '../../database-mongo/index.js' );

exports.bakeCookies = ( algorithm = 'sha256' ) => {
  var randomString = crypto.randomBytes( 32 ).toString( 'hex' );
  var hash = crypto.createHash( algorithm );

  hash.update( randomString )

  return hash.digest( 'hex' );
};

exports.parseCookies = ( req, res, next ) => {
  var cookieString = req.get( 'Cookie' ) || '';
  var cookies = cookieString.split( '; ' );

  req.cookies = req.cookies || {};

  for ( var i = 0; i !== cookies.length; i++ ) {
    var cookie = cookies[ i ].split( '=' );

    req.cookies[ cookie[ 0 ] ] = cookie[ 1 ];
  }

  next();
};

exports.createSession = ( req, res, next ) => {
  Promise.resolve( req.cookies.takoyaki )
  .then( ( cookie ) => {
    if ( !cookie ) {
      throw cookie;
    }

    return Database.getCookie( cookie );
  } )
  .tap( ( session ) => {
    if ( !session.username ) {
      throw session;
    }

    req.session = session;

    next();
  } )
  .catch( ( error ) => {
    var cookie = this.bakeCookies();
    
    Database.setCookie( cookie );

    req.session = {};
    res.cookie( 'takoyaki', cookie );

    next();
  } );
};

exports.verifySession = ( req, res, next ) => {
  if ( req.session.username ) {
    next();
  } else {
    res.redirect( '/login' );
  }
};

//bakeCookies
//MinimumInput; Output = Random 32 Byte Cookie;

//parseCookies
//MinimumInput = Server Request, Server Response, Express Function next; Output;

//createSession
//MinimumInput = Server Request, Server Response, Express Function next; Output;

//verifySession
//MinimumInput = Server Request, Server Response, Express Function next; Output;