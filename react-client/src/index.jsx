import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {}
  }

  componentDidMount() {
    $.ajax( {
      url: '/', 
      success: ( data ) => {
        console.log( data );
      },
      error: ( error ) => {
        console.log( 'ERROR: ', error );
      }
    } );
  }

  render () {
    return (
      <div>
      </div>
    )
  }
}

ReactDOM.render( <App/>, document.querySelector( '#app' ) );