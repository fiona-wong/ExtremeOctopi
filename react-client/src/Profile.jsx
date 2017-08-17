import React from 'react';

class Profile extends React.Component {
	constructor(props) {
    	super(props);

    	this.state = {
    		profilePic: 'https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg',
    		name: 'Fiona',
    		location: 'San Francisco',
    		hobbies: 'doing things',
    		aboutme: 'I like doing things'
    	}
	}

 // componentDidMount () {
 //    $.ajax({
 //      url: '/profile',
 //      method: 'GET',
 //      success: ( data ) => {
 //        data = JSON.parse(data)
 //        this.setState({
 //        	profilePic: data.img,
 //        	name: data.fullname,
 //        	location: data.location,
 //        	hobbies: data.hobbies,
 //        	aboutme: data.aboutme
 //        })
 //      },
 //      error: ( error ) => {
 //        //debug
 //        console.log( 'ERROR: ', error );
 //      }
 //    });
 //  }

  render () {
    return (
    	<div className="form-control">
    	<h1>{this.state.name}'s Profile</h1>

    	<img src={this.state.profilePic} width="200" height="200"></img>{this.state.location}

    	{this.state.hobbies}
    	{this.state.aboutme}

    	<button>Send {this.state.name} a message!</button>

    	</div>
    );
  }
}

export default Profile