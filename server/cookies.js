const crypto = require( 'cryto' );
const Promise = require( 'bluebird' );

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
  
};

exports.verifySession = ( session ) => {
  
};