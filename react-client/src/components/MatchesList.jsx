import React from 'react';

const MatchesList = (props) => (
  <div>
    <h3>Top 10 Matches</h3>
    <div>
    <ul className="list-group">
      {props.matches.map((match, index) => (
        <li key={index} className="list-group-item">{match}</li>
      ))}
    </ul>
    </div>
  </div>  
);

export default MatchesList;