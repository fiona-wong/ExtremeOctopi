import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import EditProfile from './components/EditProfile.jsx';


class Matches extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      hobbies: '',
      aboutme: '',
      matches: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount () {
  //   $.ajax({
  //     url: '/matches',
  //     method: 'GET',
  //     success: (data) => {
  //       data = JSON.parse(data);
  //       this.setState({
  //         name: data.name,
  //         hobbies: data.hobbies,
  //         aboutme: data.aboutme,
  //         matches: data.matches
  //       })
  //     },
  //     error: (error) => {
  //       //debug
  //       console.log( 'ERROR: ', error );
  //     }
  //   });
  // }


  handleEditProfile (event) {
    event.preventDefault();


  }

  handleChange (event) {
    event.preventDefault();
    this.setState({
      [name]: event.target.value
    })
  }



  render () {
    return (
      <div>
        <EditProfile handleChange={this.handleChange}/>
      </div>
    )
  }
}

export default Matches