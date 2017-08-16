var expect = require( 'chai' ).expect;
var authentication = require( '../server/authentication/authentication.js' );

describe( 'Password Security', () => {
  it ( 'should generate random salts', () => {
    aSalt = authentication.generateSalt();
    bSalt = authentication.generateSalt();

    expect( aSalt ).to.be.an( 'string' );
    expect( aSalt ).to.not.equal( bSalt );
  } );

  it ( 'should hash passwords',() => {
    var password = 'password';
    var passwordHash = authentication.generateHash( password );
    var passwordRehash = authentication.generateHash( password );

    expect( passwordHash ).to.be.an( 'string' );
    expect( password ).to.not.equal( passwordHash );
  } );

  it ( 'should authenticate passwords', () => {
    var password = 'password';
    var wrongPassword = 'wrongPassword';
    var passwordHash = authentication.generateHash( password );
    var authorizePassword = authentication.authenticate( password, passwordHash );
    var authorizeWrongPassword = authentication.authenticate( wrongPassword, passwordHash );

    expect( authorizePassword ).to.be.an( 'boolean' );
    expect( authorizePassword ).to.equal( true );
    expect( authorizeWrongPassword ).to.equal( false );
  } );
} );