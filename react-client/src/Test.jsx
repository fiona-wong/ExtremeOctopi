import $ from "jquery";
import React from 'react';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    $.get('/user', (username) => {
      console.log(username);
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    var params = {};
    params.personality = e.target.personalityTest.value;
    $.post('/test', params, (data) => {
      this.props.history.push('/Profile/home/');
    })
  }

  render() {
    return (
      <div>
        <div className="row">
          <h1 className="center">Personality Quiz</h1>
        </div>
        <div className="center">
          <h3>
          <a href="https://www.16personalities.com/free-personality-test" target="_blank">Take the
            test</a>
          </h3>
        </div>
        <br/>
        <br/>
        <br/>
        <div className="center">
          <form onSubmit={this.handleSubmit}>
            Your test result:&nbsp;&nbsp;
            <input required type="text" name="personalityTest" placeholder="e.g. entj"/>
            <button>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Test