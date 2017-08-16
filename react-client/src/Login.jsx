import React from 'react';
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
      <div className="wrapper">
        <form className="form-signin" onSubmit={this.handleSubmit}>
        <br/>

        <label>
          Username:
          <input
            size="35"
            className="form-control"
            required=""
            autoFocus=""
            name="username"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Password: 
          <input
            size="35"
            className="form-control"
            required=""
            name="password"
            type="password"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <button className="button btn btn-lg btn-primary btn-block" type="submit">Login</button>
      </form>
      </div>
    )
  }
}

export default Login