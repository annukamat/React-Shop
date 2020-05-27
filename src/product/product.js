import React, { Component } from 'react';
import './product.css';
import DataServices from '../services/data-services';
import NotificationServices, {
  NOTIF_WISHLIST_CHANGED,
} from '../services/notification-services';
import { Bootstrap, card, button } from 'bootstrap-4-react';

let ds = new DataServices();
let ns = new NotificationServices();

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = { onWishList: ds.itemOnWishlist() };

    //BIND
    this.onButtonClicked = this.onButtonClicked.bind(this);
    this.onWishlistChanged = this.onWishlistChanged.bind(this);
  }

  componentDidMount() {
    ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishlistChanged);
  }

  componentWillUnmount() {
    ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
  }

  onWishlistChanged(newWishlist) {
    this.setState({ onWishlist: ds.itemOnWishlist(this.props.product) });
  }

  onButtonClicked = () => {
    if (this.state.onWishlist) {
      ds.removeWishlistItem(this.props.product);
    } else {
      ds.addWishlistItem(this.props.product);
    }
  };

  render() {
    var btnClass;
    if (this.state.onWishlist) {
      btnClass = 'btn btn-danger';
    } else {
      btnClass = 'btn btn-primary';
    }

    return (
      <div className="card product" style={{ maxHeight: '800px' }}>
        <img
          className="Card-img-top"
          src={this.props.product.imgUrl}
          alt="product"
        ></img>
        <div className="card-block">
          <h4 className="card-title">{this.props.product.title}</h4>
          <p className="card-text">Price: ${this.props.product.price}</p>
          <a
            href="#"
            onClick={() => this.onButtonClicked()}
            className={btnClass}
          >
            {this.state.onWishlist ? 'Remove From Wishlist' : 'Add To Wishlist'}
          </a>
        </div>
      </div>
    );
  }
}

export default Product;
