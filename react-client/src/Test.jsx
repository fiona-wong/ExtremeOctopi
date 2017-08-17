import $ from "jquery";
import React from 'react';
import { Link } from 'react-router-dom';

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
				<h1>Personality Quiz</h1>	
				<a href="https://www.16personalities.com/free-personality-test" target="_blank">take the test</a>
				<br/>
				<br/>
				<br/>
				<form onSubmit={this.handleSubmit}>
					Your test result:&nbsp;&nbsp; 
						<input type="text" name="personalityTest" placeholder="e.g. entj-A" />
						<button>Submit</button>
				</form>
			</div>	
    )
  }
}

export default Test