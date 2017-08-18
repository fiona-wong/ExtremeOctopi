import $ from "jquery";
import React from 'react';
import {Link} from 'react-router-dom';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit(e) {
    e.preventDefault();
    var personality = e.target.personalityTest.value;
    $.post('/test', (data) => {
      window.location = "/profile";
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
            <input type="text" name="personalityTest" placeholder="e.g. entj"/>
            <button>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Test