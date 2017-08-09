import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Signup from './Signup.jsx';
import Login from './Login.jsx';

class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
    }
  }

  render () {
    return (
      <div>
      <Signup />
      </div>
    )
  }
}

ReactDOM.render( <App/>, document.querySelector( '#app' ) );