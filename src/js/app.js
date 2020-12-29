import {settings, select} from './settings.js'; //nawiasy klamrowe kiedy importujemy więcej niż jedną niedomyślna rzecz
import Product from './components/Product.js';
import Cart from './components/Cart.js';

const app = { //organizacji kodu appki, tworzy nowe instancje
  initMenu: function(){
    const thisApp = this;

    for(let productData in thisApp.data.products) { //(kazdy obiekt z products) przekazuje do konstruktora nie tylko nazwę prod 'np. cake' ale też ukryty obiekt: class, name, price...
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },

  initData: function () {
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.product;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        console.log('parsedResponse',parsedResponse);

        thisApp.data.products = parsedResponse;

        thisApp.initMenu();
      });
    console.log('thisApp.data', JSON.stringify(thisApp.data));
  },

  initCart: function() {
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function(event) {
      app.cart.add(event.detail.product);
    });
  },

  init: function(){
    const thisApp = this;

    thisApp.initData();
    thisApp.initCart();
  },
};

app.init(); //lista tresci
