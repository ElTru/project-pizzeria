/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = { //obiekt zawierający selektory
    templateOf: {
      menuProduct: '#template-menu-product',
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
  };

  const settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 1,
      defaultMax: 9,
    }
  };

  const templates = { //szablony Handlebars, do których wykorzystujemy selektory z obiektu select,
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
  };

  class Product{
    constructor(id, data){
      const thisProduct = this;
      thisProduct.id = id;
      thisProduct.data = data;
      thisProduct.renderInMenu();
      console.log('new Product:', thisProduct)
    }
    renderInMenu(){
      const thisProduct = this;
      //generate HTML of single product(template)
      const generateHTML = templates.menuProduct(thisProduct.data);
      //create element DOM based on product HTML code, use utils.createElementFromHTML
      thisProduct.element = utils.createDOMFromHTML(generateHTML);
      // find menu container on website
      const menuContainer = document.querySelector(select.containerOf.menu);
      // add element DOM to found menu
      menuContainer.appendChild(thisProduct.element); //wrzuca na koniec menu produkt
    }
  }

  const app = { //organizacji kodu appki, tworzy nowe instancje
    initMenu: function(){
      const thisApp = this;
      console.log('thisApp.data:', thisApp.data);

      for(let productData in thisApp.data.products) { //(kazdy obiekt z products) przekazuje do konstruktora nie tylko nazwę prod 'np. cake' ale też ukryty obiekt: class, name, price...
        new Product(productData, thisApp.data.products[productData]);
      }
    },

    initData: function(){
      const thisApp = this;

      thisApp.data = dataSource;
    },

    init: function(){
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);

      thisApp.initData();
      thisApp.initMenu();
    },
  };

  app.init(); //lista tresci
}
