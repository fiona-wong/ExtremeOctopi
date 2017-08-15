var expect = require( 'chai' ).expect;
var httpMocks = require( 'node-mocks-http' );
var cookies = require( './cookies.js' );

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

    cookies.parseCookies( requestWithoutCookies, () => {
      var cookies = requestWithoutCookies.cookies;
      var expectedCookies = {};

      expect( cookies ).to.be.an( 'object' );
      expect( cookies ).to.eql( expectedCookies );
    } );

    cookies.parseCookies( requestWithCookies, () => {
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

  it( 'should initialize sessions given invalid cookies', () => {
    var requestWithCookies = httpMocks.createRequest(
      { headers: { Cookie: 'hotate=aCookie; takoyaki=bCookie; tamago=cCookie' } }
    );
    var response = httpMocks.createResponse();

    cookies.parseCookies( requestWithCookies, () => {
      cookies.createSession( requestWithCookies, response, () => {
        expect( requestWithCookies.session.cookie ).to.exist;
        expect( response.cookies.takoyaki.value ).to.exist;
      } );
    } );
  } );

  xit ( 'should retrieve sessions given valid cookies', () => {
    var requestWithoutCookies = httpMocks.createRequest();
    var response = httpMocks.createResponse();

    cookies.createSession( requestWithoutCookies, response, () => {
      var requestWithCookies = httpMocks.createRequest();
      var response = httpMocks.createResponse();

      requestWithCookies.cookies = { takoyaki: requestWithoutCookies.session.cookie };
      //Upgrade a session with a username

      cookies.createSession( requestWithCookies, response, () => {
        expect( requestWithCookies.session.cookie ).to.eql( requestWithoutCookies.session.cookie );
      } );
    } );
  } );

  xit( 'should verify sessions', () => {
    console.log( 'IN PROGRESS' );
  } );
} );