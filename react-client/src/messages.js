import React from 'react';
import $ from 'jquery';

class Messages extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      message: '',
      messages: []
    }

    this.updateMessages();
  }

  updateMessages() {
    $.ajax( {
      method: 'GET',
      url: '/message',
      success: ( data ) => {
        console.log( 'SUCCESS:', JSON.parse(data).received );

        this.setState({
          messages: JSON.parse(data).received
        });
        console.log(this.state);
      },
      error: ( error ) => {
        console.log( 'ERROR:', error );
      }
    } );
  }

  onChange( event ) {
    this.setState( { message: event.target.value } );
  }

  onClick() {
    this.state.messages.push( this.state.message );

    $.ajax( {
      method: 'POST',
      url: '/message',
      data: { sender: this.state.user,
              receiver: this.state.match,
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
        { this.state.messages.map( ( message, index ) => {
            return <div key={ index }>{ message.message }</div>;
          } ) }
        <br></br>
        <input onChange={ this.onChange.bind( this ) }></input>
        <button onClick={ this.onClick.bind( this ) }>Submit</button>
      </div>
    );
  }
}

export default Messages