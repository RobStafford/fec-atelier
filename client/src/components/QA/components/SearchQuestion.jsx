import React from 'react';

let SearchQuestion = (props) => {
  return <div data-testid="search-question" className="qa-search-bar">
    <input type="text" placeholder="Search for answers..." onChange={props.searchQuestions}></input>
  </div>;
}

export default SearchQuestion;
