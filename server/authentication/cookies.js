const crypto = require( 'crypto' );
const Promise = require( 'bluebird' );
const Database = require( '../../database-mongo/index.js' );

const getCookie = Database.getCookieUser;
const setCookie = Database.postCookie;

exports.bakeCookies = ( bytes = 32, algorithm = 'sha256' ) => {
  var randomString = crypto.randomBytes( bytes ).toString( 'hex' );
  var hash = crypto.createHash( algorithm );

  hash.update( randomString )

  return hash.digest( 'hex' );
};

exports.parseCookies = ( req, res, next ) => {
  var cookieString = req.get( 'Cookie' );
    
  req.cookies = req.cookies || {};

  if ( cookieString ) {
    var cookies = cookieString.split( '; ' );


    for ( var i = 0; i !== cookies.length; i++ ) {
      var cookie = cookies[ i ].split( '=' );

      req.cookies[ cookie[ 0 ] ] = cookie[ 1 ];
    }
  }

  next();
};

exports.createSession = ( req, res, next ) => {
  Promise.resolve( req.cookies.takoyaki )
  .then( ( cookie ) => {
    if ( !cookie ) {
      throw cookie;
    }

    return getCookie( cookie );
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
    
    setCookie( cookie );

    req.session = { cookie: cookie };
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
//MinimumInput = Server Request, Express Function next; Output;

//createSession
//MinimumInput = Server Request, Server Response, Express Function next; Output;

//verifySession
//MinimumInput = Server Request, Server Response, Express Function next; Output;