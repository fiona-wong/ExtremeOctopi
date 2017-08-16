import React from 'react';

const MatchesList = (props) => (
  <div>
    <h3>Top 10 Matches</h3>
    <div>
    <ul>
      {props.matches.map((match, index) => (
        <li key={index}>{match}</li>
      ))}
    </ul>
    </div>
  </div>  
);

export default MatchesList;