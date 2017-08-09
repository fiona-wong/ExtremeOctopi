const cryto = require( 'cryto' );

exports.generateSalt = () => {
  return crypto.randomBytes( 32 ).toString( 'hex' );
};

exports.generateHash = ( password, salt, algorithm = 'sha256' ) => {
  var hash = crypto.createHash( algorithm );

  hash.update( password + salt );

  return hash.digest( 'hex' );
};

exports.authenticate = ( attemptedPassword, password, salt, algorithm = 'sha256' ) => {
  var attemptedPassword = this.generateHash( attemptedPassword, salt, algorithm );

  if ( attemptedPassword === password ) {
    return true;
  } else {
    return false;
  }
};