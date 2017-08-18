import EditProfile from './components/EditProfile.jsx';
import MatchesList from './components/MatchesList.jsx';
import React from 'react';
import $ from 'jquery';
import ImageUpload from './components/UploadPic.jsx';


class Matches extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      hobbies: '',
      aboutme: '',
      matches: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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


  handleEditProfile(event) {
    event.preventDefault();


  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }


  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <ImageUpload />
          </div>
          <div className="col-md-8">
            <EditProfile handleChange={this.handleChange}/>
          </div>
        </div>
        <div className="row">
          <div className="matches-list col-lg-offset-1">
            <MatchesList matches={this.state.matches}/>
          </div>
        </div>
        <div className="row get-messages">
          <button>Click for Messages!</button>
        </div>
      </div>
    )
  }
}

export default Matches