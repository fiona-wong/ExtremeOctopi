import EditProfile from './components/EditProfile.jsx';
import MatchesList from './components/MatchesList.jsx';
import React from 'react';
import $ from 'jquery';

class Matches extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      hobbies: '',
      aboutme: '',
      matches: [1,2,3,4,5,6,7,8,9,10]
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
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }



  render () {
    return (
      <div>
        <EditProfile handleChange={this.handleChange}/>
        <MatchesList matches={this.state.matches}/>
        <button>Click for Messages!</button>
      </div>
    )
  }
}

export default Matches