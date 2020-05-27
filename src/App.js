import React, { Component } from 'react';
import './App.css';
//components
import Product from './product/product';
import Wishlist from './wishlist/wishlist';

//service
import HttpService from './services/http-service';
import { Bootstrap, Grid, Row, Col } from 'bootstrap-4-react';

const http = new HttpService();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { products: [] };

    //bind functions
    this.loadData = this.loadData.bind(this);
    this.productList = this.productList.bind(this);
    this.loadData();
  }

  loadData = () => {
    var self = this;
    http.getProducts().then(
      (data) => {
        self.setState({ products: data });
      },
      (err) => {}
    );
  };

  productList = () => {
    const list = this.state.products.map((product) => (
      <div className="col-sm-4" key={product._id}>
        <Product product={product} />
      </div>
    ));
    return list;
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Swag Shop</h2>
        </div>
        <div className="container-fluid App-main">
          <div className="row">
            <div className="col-sm-8">
              <div className="row">{this.productList()}</div>
            </div>
            <div className="col-sm-4">
              <Wishlist />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
