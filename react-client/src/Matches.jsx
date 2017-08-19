import EditProfile from './components/EditProfile.jsx';
import MatchesList from './components/MatchesList.jsx';
import ImageUpload from './components/UploadPic.jsx';
import React from 'react';
import $ from 'jquery';

class Matches extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      name: '',
      location: '',
      hobbies: '',
      aboutme: '',
      matches: [
        { name: 'Not Logged In', pic: 'https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg' },
        { name: 'Not Logged In', pic: 'https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg' },
        { name: 'Not Logged In', pic: 'https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg' },
        { name: 'Not Logged In', pic: 'https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg' },
        { name: 'Not Logged In', pic: 'https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg' },
        { name: 'Not Logged In', pic: 'https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg' }
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
    this.showMatchProfile = this.showMatchProfile.bind(this);

  }

  componentDidMount() {
    Promise.resolve()
    .then(() => {
      $.ajax( {
      method: 'POST',
      url: '/matches',
      data: {
        numberToReturn: 5,
        maxFriends: 5,
      },
      success: ( data ) => {
        console.log( 'SUCCESS', data );
      },
      error: ( error ) => {
        console.log( 'ERROR:', error );
      }
    } );
    })
    .then(() => {
      $.ajax({
        method: 'GET',
        url: '/matches',
        success: ( data ) => {
          data = JSON.parse( data );

          if ( data ) {
            if ( data.length === 0 ) {
              data = [
                { name: '｡ﾟ(*´□`)ﾟ｡', pic: 'https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg' },
                { name: '｡ﾟ(*´□`)ﾟ｡', pic: 'https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg' },
                { name: '｡ﾟ(*´□`)ﾟ｡', pic: 'https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg' },
                { name: '｡ﾟ(*´□`)ﾟ｡', pic: 'https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg' },
                { name: '｡ﾟ(*´□`)ﾟ｡', pic: 'https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg' },
                { name: '｡ﾟ(*´□`)ﾟ｡', pic: 'https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg' }
              ]
            }

            this.setState( {
              matches: data
            } );
          }
        },
        error: ( error ) => {
          console.log( 'ERROR:', error );
        }
      });
    })
    .then(() => {
      $.ajax({
        method: 'GET',
        url: '/profile',
        success: ( data ) => {
          data = JSON.parse( data );
          this.setState ( {
            name: data.fullname || '~(>_<~)',
            location: data.location || '~(>_<~)',
            hobbies: data.hobbies || '~(>_<~)',
            aboutme: data.blog || '~(>_<~)'
          } );
        },
        error: ( error ) => {
          console.log( 'ERROR:', error );
        }
      });
    })
  }

  handleEditProfile( event ) {
    event.preventDefault();

    $.post( 'updateUser', this.state, ( data ) => {
      var data  = JSON.parse( data );

      if( data ) {
        console.log( 'SUCCESS:', data );
      } else {
        console.log( 'ERROR:', data );
      }
    } );
  }

  handleChange( event ) {
    event.preventDefault();

    const target = event.target;
    const name = target.name;

    this.setState( {
      [ name ]: target.value
    } );
  }

  showMatchProfile (event) {
    event.preventDefault();
    console.log('clicked', event.target)
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4 col-md-offset-1">
            <ImageUpload/>
          </div>
          <div className="col-md-7">
            <EditProfile n={this.state.name} l={this.state.location} h={this.state.hobbies} a={this.state.aboutme} handleChange={this.handleChange} handleEditProfile={this.handleEditProfile}/>
          </div>
        </div>
        <div className="row">
          <div className="matches-list col-lg-offset-1">
            <MatchesList matches={ this.state.matches } showMatchProfile={this.showMatchProfile}/>
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