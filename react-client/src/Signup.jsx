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
      <div className="wrapper">
        <form className="form-signin" onSubmit={this.handleSubmit}>
        <br />
        <label>
          Full Name:
          <input
            size="35"
            className="form-control"
            required=""
            autoFocus=""          
            name="fullname"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
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
            autoFocus=""          
            name="password"
            type="password"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          E-mail:
          <input
            size="35"
            className="form-control"
            required=""
            autoFocus=""          
            name="email"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <br />
        <button className="button btn btn-lg btn-primary btn-block" type="submit">Sign Me Up!</button>
      </form>
      </div>

    )
  }
}

export default Signup
