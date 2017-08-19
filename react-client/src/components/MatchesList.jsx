import MatchItem from './MatchItem.jsx';
import React from 'react';

const MatchesList = ( props ) => (
  <div>
    <h3>Top Matches</h3>
    <div>
      <ul className="list-group">
        { props.matches.map( ( match, index ) => (
            <MatchItem key={ index } match={ match }/> )
          ) 
        }
      </ul>
    </div>
  </div>  
);

export default MatchesList;