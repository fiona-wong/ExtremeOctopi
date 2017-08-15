import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


const EditProfile = (props) => (
  <div>
    <form onSubmit={props.handleEditProfile}>
      <label>
        Name:
        <input name='editName' type="text" onChange={props.handleChange} />
      </label>
      <br/>
      <label>
        Hobbies/Interests:
        <textarea name='editHobbies' type="text" onChange={props.handleChange} />
      </label>
      <br />
      <label>
        About Me:
        <textarea name='editAbout' onChange={props.handleChange} />
      </label>
     <br />
      <input type="submit" value="Edit Profile" />
    </form>
  </div>
)

export default EditProfile