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

  handleSubmit() {
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
        <form className="form-signin">
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
        <input type="submit" value="Submit" onSubmit={this.handleSubmit}/>
      </form>
      </div>
    )
  }
}

export default Signup
