import React from 'react';

const MatchItem = ( props ) => (
  <div onClick={props.lookupProfile} className="list-group-item">
    <div className="row">
      <img className="imgPreview" src={props.match.fpic}/>
    </div>
    <div className="row item-name">
      {props.match.fusername}
    </div>
  </div>
);

export default MatchItem;