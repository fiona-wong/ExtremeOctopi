import React from 'react';
import $ from 'jquery';

const EditProfile = (props) => (
  <h3>
    <form onSubmit={props.handleEditProfile} className="form-horizontal">
      <div className="form-group">
        <label className="control-label col-sm-4" htmlFor="name">Name:</label>
        <input id="name" name="name" type="text" onChange={props.handleChange}/>
      </div>
      <div className="form-group">
        <label className="control-label col-sm-4" htmlFor="hobbies">Hobbies/Interests:</label>
        <input id="hobbies" name="hobbies" type="text" onChange={props.handleChange}/>
      </div>
      <div className="form-group">
        <label className="control-label col-sm-4" htmlFor="about">About Me:</label>
        <input id="about" name="aboutme" type="text" onChange={props.handleChange}/>
      </div>

      <div className="form-group">
        <div className="col-sm-offset-5">
          <button type="submit" className="btn btn-default">Edit Profile</button>
        </div>
      </div>

    </form>
  </h3>
)

export default EditProfile