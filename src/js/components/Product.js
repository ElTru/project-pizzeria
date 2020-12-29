import {select, classNames, templates} from './../settings.js';
import {utils} from './../utils.js';
import AmountWidget from './AmountWidget.js';

class Product{
  constructor(id, data){
    const thisProduct = this;
    thisProduct.id = id;
    thisProduct.data = data;
    thisProduct.renderInMenu();
    thisProduct.getElements();
    thisProduct.initAccordion();
    thisProduct.initOrderForm();
    thisProduct.initAmountWidget();
    thisProduct.processOrder();

    //console.log('new Product:', thisProduct);
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
    thisProduct.amountWidgetElem = thisProduct.element.querySelector(select.menuProduct.amountWidget);
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
      thisProduct.addToCart();
    });
  }

  processOrder(){
    const thisProduct = this;

    const formData = utils.serializeFormToObject(thisProduct.form);

    // set price to default price
    let price = thisProduct.data.price;

    // for every category (param)...
    for(let paramId in thisProduct.data.params) {
      // determine param value, e.g. paramId = 'toppings', param = { label: 'Toppings', type: 'checkboxes'... }
      const param = thisProduct.data.params[paramId]; //paramID pomaga w zwróceniu wszystkiego z param

      // for every option in this category
      for(let optionId in param.options) {
      // determine option value, e.g. optionId = 'olives', option = { label: 'Olives', price: 2, default: true }
        const option = param.options[optionId];

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
    }
    //multiply price by amount
    const priceSingle = price;
    price *= thisProduct.amountWidget.value;

    // update calculated price in the HTML
    thisProduct.priceElem.innerHTML = price;
    return priceSingle;
  }

  initAmountWidget(){
    const thisProduct = this;

    thisProduct.amountWidget = new AmountWidget(thisProduct.amountWidgetElem);
    thisProduct.amountWidgetElem.addEventListener('updated', function(){
      thisProduct.processOrder();
    });
  }

  addToCart() {
    const thisProduct = this;
    //app.cart.add(thisProduct.prepareCartProduct());
    const event = new CustomEvent('add-to-cart', {
      bubbles: true,
      detail: {
        product: thisProduct.prepareCartProduct(),
      },
    });
    thisProduct.element.dispatchEvent(event);
  }

  prepareCartProduct(){
    const thisProduct = this;

    const productSummary = {
      id: thisProduct.id,
      name: thisProduct.data.name,
      amount: thisProduct.amountWidget.value,
      priceSingle: thisProduct.processOrder(),
      price: thisProduct.processOrder() * thisProduct.amountWidget.value,
      params: thisProduct.prepareCartProductParams(),
    };
    return productSummary;
  }

  prepareCartProductParams(){
    const thisProduct = this;

    const formData = utils.serializeFormToObject(thisProduct.form);
    const params = {};

    for(let paramId in thisProduct.data.params) {
      const param = thisProduct.data.params[paramId];
      params[paramId] = { //create category param in params
        name: param.label,
        options: {}
      };

      // for every option in this category
      for(let optionId in param.options) {
        const option = param.options[optionId];
        const optionSelected = formData[paramId] && formData[paramId].includes(optionId);

        if(optionSelected) {
          //check if the opriin is not default
          params[paramId].options = option;
        }
      }
    }
    return params;
  }
}

export default Product;
