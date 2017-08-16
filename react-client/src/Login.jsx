import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange (event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    $.ajax({
      url: '/login',
      method: 'POST',
      data: {
        username: this.state.username,
        password: this.state.password
      },
      success: ( data ) => {
        //renders new page
        console.log( data );
      },
      error: ( error ) => {
        //debug
        console.log( 'ERROR: ', error );
      }
    });
  }

  render () {
    return (
      <div className="centered login">
        <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input
            name="username"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            name="password"
            type="password"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <input type="submit" value="Submit"/>
      </form>
      </div>
    )
  }
}

export default Login