import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: '',
      email: '',
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
      url: '/signup',
      method: 'POST',
      data: {
        fullname: this.state.fullname,
        email: this.state.email,
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
      <div>
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
        <label>
          E-mail:
          <input
            name="email"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Full Name:
          <input
            name="fullname"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <br />
        <button>Submit</button>
      </form>
      </div>

    )
  }
}

export default Signup
