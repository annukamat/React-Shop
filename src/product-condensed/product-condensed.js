import React, { Component } from 'react';
import './product-condensed.css';
import { Bootstrap, card, button } from 'bootstrap-4-react';
import DataServices from '../services/data-services';

let ds = new DataServices();

class ProductCondensed extends Component {
  constructor(props) {
    super(props);

    //BIND
    this.removeProduct = this.removeProduct.bind(this);
  } 

  removeProduct = () => {
    ds.removeWishlistItem(this.props.product);
  };

  render() {
    return (
      <li className="list-group-item pc">
        <div className="pc1">
          <a
            className="btn btn-outline-danger"
            onClick={() => this.removeProduct()}
          >
            x
          </a>
          <p>
            {this.props.product.title} | <b>${this.props.product.price}</b>
          </p>
        </div>
      </li>
    );
  }
}

export default ProductCondensed;
