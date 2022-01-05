import React from 'react';
import $ from 'jquery';
import ProductCard from './Product-Card.jsx';
import { Carousel } from '@trendyol-js/react-carousel';
import { Item } from  './Product-Card.jsx';
// import { getRelatedItemPhotos, getRelatedItems } from '../../../../utils/RelatedProducts.js';

class RelatedItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentItem : props.itemId,
      relatedItems : []
    };
  }

  componentDidMount() {
    $.ajax({
      url: '/relatedItems',
      method: 'GET',
      data: {item_id: this.state.currentItem},
      success: data => {
        this.setState({relatedItems: data})
      }
    })
  }

  render() {
    if (!this.state.relatedItems.length) {
      return <div className="blankLoad"></div>
    }
    let i=0;
    return (
      <Carousel show={3.5} slide={3} transition={0.5}>
        {this.state.relatedItems.map(item => {
          i++;
          return (<ProductCard item={item} key={i} type={'related'}/>)
        })}
      </Carousel>
    )
  }
}

export default RelatedItems;