var mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/test' );

var db = mongoose.connection;

db.on( 'error', () => {
  console.log( 'mongoose connection error' );
} );

db.once( 'open', () => {
  console.log( 'mongoose connected successfully' );
} );

var schema = mongoose.Schema( {
} );

var Data = mongoose.model( 'Data', schema ) ;