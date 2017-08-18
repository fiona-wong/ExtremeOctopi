const Database = require( '../database-mongo/index.js' );
var httpMocks = require( 'node-mocks-http' );
var cookies = require( '../server/authentication/cookies.js' );
var expect = require( 'chai' ).expect;

describe( 'Sessions', () => {
  it( 'should bake random cookies', () => {
    var aCookie = cookies.bakeCookies();
    var bCookie = cookies.bakeCookies();

    expect( aCookie ).to.be.an( 'string' );
    expect( aCookie ).to.not.equal( bCookie );
  } );

  it( 'should parse cookies', () => {
    var requestWithoutCookies = httpMocks.createRequest();
    var requestWithCookies = httpMocks.createRequest(
      { headers: { Cookie: 'hotate=aCookie; takoyaki=bCookie; tamago=cCookie' } }
    );
    var response = httpMocks.createResponse();

    cookies.parseCookies( requestWithoutCookies, response, () => {
      var cookies = requestWithoutCookies.cookies;
      var expectedCookies = {};

      expect( cookies ).to.be.an( 'object' );
      expect( cookies ).to.eql( expectedCookies );
    } );

    cookies.parseCookies( requestWithCookies, response, () => {
      var cookies = requestWithCookies.cookies;
      var expectedCookies = { hotate: 'aCookie', takoyaki: 'bCookie', tamago: 'cCookie' };

      expect( cookies ).to.be.an( 'object' );
      expect( cookies ).to.eql( expectedCookies );
    } );
  } );

  it( 'should initialize sessions given no cookies', () => {
    var requestWithoutCookies = httpMocks.createRequest();
    var response = httpMocks.createResponse();

    cookies.createSession( requestWithoutCookies, response, () => {
      expect( requestWithoutCookies.session.cookie ).to.exist;
      expect( response.cookies.takoyaki.value ).to.exist;
    } );
  } );

  it( 'should initialize sessions given invalid cookies', ( done ) => {
    var requestWithCookies = httpMocks.createRequest(
      { headers: { Cookie: 'hotate=aCookie; takoyaki=bCookie; tamago=cCookie' } }
    );
    var response = httpMocks.createResponse();

    cookies.parseCookies( requestWithCookies, response, () => {
      cookies.createSession( requestWithCookies, response, () => {
        expect( requestWithCookies.session.cookie ).to.exist;
        expect( response.cookies.takoyaki.value ).to.exist;

        done();
      } );
    } );
  } );

  it ( 'should retrieve sessions given valid cookies', ( done ) => {
    var cookie = cookies.bakeCookies();
    var user =  {
      username: 'username',
      password: 'password',
      fullname: 'fullname',
      email: 'email',
      location: 'location',
    };

    Database.clear( () => {
      Database.postUser( user, cookie, () => {
        var requestWithCookies = httpMocks.createRequest(
          { headers: { Cookie: 'hotate=aCookie; takoyaki=' +  cookie + '; tamago=cCookie' } }
        );
        var response = httpMocks.createResponse();

        cookies.parseCookies( requestWithCookies, response, () => {
          cookies.createSession( requestWithCookies, response, () => {
            Database.clear( () => {
              expect( response.cookies.takoyaki ).to.not.exist;
              expect( requestWithCookies.session.username ).to.equal( 'username' );

              done();
            } );
          } );
        } );
      } );
    } );
  } );

  it( 'should verify sessions', ( done ) => {
    var requestWithoutCookies  = httpMocks.createRequest();
    var response = httpMocks.createResponse();

    cookies.createSession( requestWithoutCookies, response, () => {
      cookies.verifySession( requestWithoutCookies, response, ( valid )  => {
        expect( valid ).to.equal( false );
      } );
    } );

    var cookie = cookies.bakeCookies();
    var user =  {
      username: 'username',
      password: 'password',
      fullname: 'fullname',
      email: 'email',
      location: 'location',
    };

    Database.clear( () => {
      Database.postUser( user, cookie, () => {
        var requestWithCookies = httpMocks.createRequest(
          { headers: { Cookie: 'hotate=aCookie; takoyaki=' +  cookie + '; tamago=cCookie' } }
        );
        var response = httpMocks.createResponse();

        cookies.parseCookies( requestWithCookies, response, () => {
          cookies.createSession( requestWithCookies, response, () => {
            cookies.verifySession( requestWithCookies, response, ( valid ) => {
              Database.clear( () => {
                expect( valid ).to.equal( true );

                done();
              } );
            } );
          } );
        } );
      } );
    } );
  } );
} );