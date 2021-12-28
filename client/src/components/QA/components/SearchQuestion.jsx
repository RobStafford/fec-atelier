import React from 'react';

let SearchQuestion = (props) => {
  return <div className="qa-search-bar">
    <input type="text" placeholder="Search for answers..." onChange={props.searchQs}></input>
  </div>;
}

export default SearchQuestion;
