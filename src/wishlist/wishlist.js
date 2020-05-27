import React, { Component } from 'react';
import './wishlist.css';
import ProductCondensed from '../product-condensed/product-condensed';
import NotificationServices, {
  NOTIF_WISHLIST_CHANGED,
} from '../services/notification-services';

import { Bootstrap, card, button } from 'bootstrap-4-react';

let ns = new NotificationServices();

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlist: [],
    };
    //bind
    this.createWishlist = this.createWishlist.bind(this);
    this.onWishlistChanged = this.onWishlistChanged.bind(this);
  }

  componentDidMount() {
    ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishlistChanged);
  }

  componentWillUnmount() {
    ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
  }

  onWishlistChanged(newWishlist) {
    this.setState({ wishlist: newWishlist });
  }

  //createwishlist
  createWishlist = () => {
    const list = this.state.wishlist.map((product) => (
      <ProductCondensed product={product} key={product._id} />
    ));
    return list;
  };

  render() {
    return (
      <div className="card">
        <div className="card-block">
          <div className="card-title">Wishlist</div>
          <ul className="list-group">{this.createWishlist()}</ul>
        </div>
      </div>
    );
  }
}

export default Wishlist;
