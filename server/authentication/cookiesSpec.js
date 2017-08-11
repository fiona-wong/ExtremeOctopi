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
      { headers: { Cookie: 'hotate=cCookie; takoyaki=aCookie; tamago=bCookie' } }
    );

    cookies.parseCookies( requestWithoutCookies, () => {
      var cookies = requestWithoutCookies.cookies;
      var expectedCookies = {};

      expect( cookies ).to.be.an( 'object' );
      expect( cookies ).to.eql( expectedCookies );
    } );

    cookies.parseCookies( requestWithCookies, () => {
      var cookies = requestWithCookies.cookies;
      var expectedCookies = { hotate: 'cCookie', takoyaki: 'aCookie', tamago: 'bCookie' };

      expect( cookies ).to.be.an( 'object' );
      expect( cookies ).to.eql( expectedCookies );
    } );
  } );

  xit( 'should create sessions', () => {
    console.log( 'IN PROGRESS' );
  } );

  xit( 'should verify sessions', () => {
    console.log( 'IN PROGRESS' );
  } );
} );