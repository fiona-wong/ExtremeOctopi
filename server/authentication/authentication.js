const crypto = require( 'crypto' );

var bytes = 32;
exports.generateSalt = (   ) => {
  return crypto.randomBytes( bytes ).toString( 'hex' );
};

var salt = '';
var algorithm = 'sha256';
exports.generateHash = ( password ) => {
  var hash = crypto.createHash( algorithm );

  hash.update( password + salt );

  return hash.digest( 'hex' );
};

exports.authenticate = ( attemptedPassword, password ) => {
  var attemptedPassword = this.generateHash( attemptedPassword, salt, algorithm );

  return attemptedPassword === password;
};

//generateSalt
//MinimumInput; Output = Random 32 Bytes String Salt;

//generateHash
//MinimumInput = String password; Output = String Hash;

//authenticate
//MinimumInput = String attemptedPassword, String password; Output = Boolean;