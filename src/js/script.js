/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = { //obiekt zawierający selektory
    templateOf: {
      menuProduct: '#template-menu-product', //scrypt  z type=handlebars
    },
    containerOf: {
      menu: '#product-list', // wszystko co pod headerem
      cart: '#cart', //top koszyk
    },
    all: {
      menuProducts: '#product-list > .product', // qSA NodeList
      menuProductsActive: '#product-list > .product.active', // qSA NodeList
      formInputs: 'input, select', // qSA NodeList(2) [input, input]
    },
    menuProduct: {
      clickable: '.product__header', // qSA NodeList
      form: '.product__order',
      priceElem: '.product__total-price .price', // qSA NodeList
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]', // qSA NodeList
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  /* const ole = document.querySelectorAll(select.widgets.amount.input);
  console.log('ole', ole); */

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
      thisProduct.getElements();
      thisProduct.initAccordion();
      thisProduct.initOrderForm();
      thisProduct.processOrder();
      console.log('new Product:', thisProduct);
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

    getElements(){
      const thisProduct = this;

      thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
      thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
      thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
      thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
      thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
      thisProduct.imageWrapper = thisProduct.element.querySelector(select.menuProduct.imageWrapper);
    }

    initAccordion(){
      const thisProduct = this;

      //START: add event listener to clickable trigger on event click
      thisProduct.accordionTrigger.addEventListener('click', function(event) {
        //prevent default action for prevent
        event.preventDefault();
        //find active product (product that has active class)
        const activeProducts = document.querySelectorAll(select.all.menuProductsActive);
        //if there is active product and it's not thisProduct.element, remove class active from it
        for (let activeProduct of activeProducts){
          if (activeProduct != thisProduct.element){
            activeProduct.classList.remove('active');
          }
        }
        //toggle active class on thisProduct.element
        thisProduct.element.classList.toggle('active');
      });
    }

    initOrderForm(){
      const thisProduct = this;

      thisProduct.form.addEventListener('submit', function(event) {
        event.preventDefault();
        thisProduct.processOrder();
      });

      for(let input of thisProduct.formInputs){
        input.addEventListener('change', function(){
          thisProduct.processOrder();
        });
      }

      thisProduct.cartButton.addEventListener('click', function(event){
        event.preventDefault();
        thisProduct.processOrder();
      });
      console.log('initOF:', thisProduct);
    }

    processOrder(){
      const thisProduct = this;

      const formData = utils.serializeFormToObject(thisProduct.form);
      console.log('formData', formData);

      // set price to default price
      let price = thisProduct.data.price;

      // for every category (param)...
      for(let paramId in thisProduct.data.params) {
        // determine param value, e.g. paramId = 'toppings', param = { label: 'Toppings', type: 'checkboxes'... }
        const param = thisProduct.data.params[paramId]; //paramID pomaga w zwróceniu wszystkiego z param
        console.log(paramId, param);

        // for every option in this category
        for(let optionId in param.options) {
        // determine option value, e.g. optionId = 'olives', option = { label: 'Olives', price: 2, default: true }
          const option = param.options[optionId];
          console.log(optionId, option);

          //check if there is param with a name of paramId in formData and if it includes optionId
          const optionSelected = formData[paramId] && formData[paramId].includes(optionId);
          if(optionSelected) {
            //check if the opriin is not default
            if(!option.default == true){
              // add option price to price variable
              price += option.price;
            }
          } else if(option.default == true){
            //reduce price variable
            price -= option.price;
          }
          const image = thisProduct.imageWrapper.querySelector('.' + paramId + '-' + optionId);
          if(optionSelected && image !== null){
            image.classList.add(classNames.menuProduct.imageVisible);
          } else if(!optionSelected && image !== null){
            image.classList.remove(classNames.menuProduct.imageVisible);
          }
        }

        // update calculated price in the HTML
        thisProduct.priceElem.innerHTML = price;
      }
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
