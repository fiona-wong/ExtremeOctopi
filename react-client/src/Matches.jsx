import EditProfile from './components/EditProfile.jsx';
import MatchesList from './components/MatchesList.jsx';
import React from 'react';
import $ from 'jquery';
import ImageUpload from './components/UploadPic.jsx';


class Matches extends React.Component {
  constructor(props) {
    super(props);

    var matchList = [
      {name: 'Alan Turning', pic: 'https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg'},
      {name: 'Tom Cruz', pic: 'https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg'},
      {name: 'Albert Einstein', pic: 'https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg'},
      {name: 'Pam Yanez', pic: 'https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg'},
      {name: 'Mike Colson', pic: 'https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg'},
      {name: 'Winnie Pooh', pic: 'https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg'}

    ];

    this.state = {
      name: '',
      hobbies: '',
      aboutme: '',
      matches: matchList
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
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

    $.post('updateUser', this.state, (res) => {
      if(res === 'Success') {

      } else {
        console.log('db not updated');
      }
    })
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
          <div className="col-md-4 col-md-offset-1">
            <ImageUpload />
          </div>
          <div className="col-md-7">
            <EditProfile handleChange={this.handleChange} handleEditProfile={this.handleEditProfile}/>
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