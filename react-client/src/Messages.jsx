import React from 'react';
import $ from 'jquery';

class Messages extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      match: '',
      message: '',
      messages: []
    }

    this.updateMessages();
  }

  updateMessages() {
    $.ajax( {
      method: 'GET',
      url: '/messages',
      success: ( data ) => {
        console.log( 'SUCCESS:', data );

        var data = JSON.parse( data );

        if ( data ) {
          this.setState( {
            messages: data.received
          } );
        }
      },
      error: ( error ) => {
        console.log( 'ERROR:', error );
      }
    } );
  }

  changeMatch( event ) {
    this.setState( { match: event.target.value } );
  }

  changeMessage( event ) {
    this.setState( { message: event.target.value } );
  }

  onClick() {
    $.ajax( {
      method: 'POST',
      url: '/message',
      data: { match: this.state.match,
              message: this.state.message
            },
      success: ( data ) => {
        console.log( 'SUCCESS:', data );

        this.updateMessages();
      },
      error: ( error ) => {
        console.log( 'ERROR:', error );
      }
    } );
  }

  render() {
    return (
      <div>
        <input onChange={ this.changeMatch.bind( this ) }  placeholder="Match Username..."></input>
        <br></br>
        <input onChange={ this.changeMessage.bind( this ) }></input>
        <button onClick={ this.onClick.bind( this ) }>Submit</button>
        <br></br>
        <br></br>
        { this.state.messages.map( ( message, index ) => {
          return <div key={ index }>{ message.sender + ': ' + message.message }</div>;
        } ) }
      </div>
    );
  }
}

export default Messages