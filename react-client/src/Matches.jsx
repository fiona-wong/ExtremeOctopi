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

    this.postMatches();

    this.getMatches();
  }

  postMatches() {
    $.ajax( {
      method: 'POST',
      url: '/matches',
      data: {
        numberToReturn: 5,
        maxFriends: 5,
      },
      success: ( data ) => {
        console.log( 'SUCCESS', data[ 0 ] );
      },
      error: ( error ) => {
        console.log( 'ERROR:', error );
      }
    } );
  }

  getMatches() {
    $.ajax( {
      method: 'GET',
      url: '/matches',
      success: ( data ) => {
        console.log( 'SUCCESS', data );

        var data = JSON.parse( data );

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
    } );
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

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4 col-md-offset-1">
            <ImageUpload/>
          </div>
          <div className="col-md-7">
            <EditProfile handleChange={ this.handleChange.bind( this ) } handleEditProfile={ this.handleEditProfile.bind( this ) }/>
          </div>
        </div>
        <div className="row">
          <div className="matches-list col-lg-offset-1">
            <MatchesList matches={ this.state.matches }/>
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