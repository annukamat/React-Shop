import 'whatwg-fetch';

class HttpService {
  getProducts = () => {
    var promise = new Promise((resolve, reject) => {
      fetch('https://swag-shop-ak.herokuapp.com/product').then((response) => {
        resolve(response.json());
      });
    });
    return promise;
  };
}

export default HttpService;
