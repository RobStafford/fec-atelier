import React from 'react';

class StarCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  flipFilter(e) {
    console.log(e.target.innerHTML);
    this.props.flip_filters(e.target.innerHTML);

  }

  render(props) {

    let star_count = this.props.star_count;
    const star_number = this.props.star_number;

    if (isNaN(star_count)) {
      return (
        <li>
          <br></br>{star_number} stars <span className="star_bar"></span>
        </li>
      );
    } else {
      return (
        <li>
          <br></br><span className="star_bar_outer" onClick={this.flipFilter.bind(this)}>{star_number} stars</span><span className="star_bar" style={{width: parseInt(star_count)}}></span>
        </li>
      );
    }
  }
}

export default StarCount;
