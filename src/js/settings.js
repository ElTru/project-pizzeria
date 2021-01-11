/* global Handlebars*/

export const select = { //obiekt zawierający selektory
  templateOf: {
    menuProduct: '#template-menu-product', //scrypt  z type=handlebars
    cartProduct: '#template-cart-product', // CODE ADDED
    bookingWidget: '#template-booking-widget',
    homeWidget: '#template-home-widget',
  },
  containerOf: {
    menu: '#product-list', // wszystko co pod headerem
    cart: '#cart', //top koszyk
    pages: '#pages',
    booking: '.booking-wrapper',
    home: '.home-wrapper',
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
  home: {
    orderPageLink: '.order-online',
    bookPageLink: '.book-a-table',
  },
  widgets: {
    amount: {
      input: 'input.amount', // CODE CHANGED
      linkDecrease: 'a[href="#less"]',
      linkIncrease: 'a[href="#more"]',
    },
    carousel: {
      wrapper: '.carousel',
    },
    datePicker: {
      wrapper: '.date-picker',
      input: `input[name="date"]`,
    },
    hourPicker: {
      wrapper: '.hour-picker',
      input: 'input[type="range"]',
      output: '.output',
    },
  },
  cart: {
    productList: '.cart__order-summary',
    toggleTrigger: '.cart__summary',
    totalNumber: `.cart__total-number`,
    totalPrice: '.cart__total-price strong, .cart__order-total .cart__order-price-sum strong',
    subtotalPrice: '.cart__order-subtotal .cart__order-price-sum strong',
    deliveryFee: '.cart__order-delivery .cart__order-price-sum strong',
    form: '.cart__order',
    formSubmit: '.cart__order [type="submit"]',
    phone: '[name="phone"]',
    address: '[name="address"]',
  },
  cartProduct: {
    amountWidget: '.widget-amount',
    price: '.cart__product-price',
    edit: '[href="#edit"]',
    remove: '[href="#remove"]',
  },
  booking: {
    peopleAmount: '.people-amount',
    hoursAmount: '.hours-amount',
    tables: '.floor-plan .table',
    tablesAll: '.floor-plan',
    phone: '[name="phone"]',
    address: '[name="address"]',
    orderButton: '.btn-secondary',
    starters: '.starters',
  },
  nav: {
    links: '.main-nav a', //some chnages
  },
};

export const classNames = {
  menuProduct: {
    wrapperActive: 'active',
    imageVisible: 'active',
  },
  cart: {
    wrapperActive: 'active',
  },
  booking: {
    table: 'table',
    loading: 'loading',
    tableBooked: 'booked',
    tableSelected: 'selected',
  },
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  },
};

export const settings = {
  hours: {
    open: 12,
    close: 24,
  },
  amountWidget: {
    defaultValue: 1,
    defaultMin: 1,
    defaultMax: 9,
  },
  datePicker: {
    maxDaysInFuture: 14,
  },
  cart: {
    defaultDeliveryFee: 20,
  },
  booking: {
    tableIdAttribute: 'data-table',
  },
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    product: 'product',
    order: 'order',
    booking: 'booking',
    event: 'event',
    dateStartParamKey: 'date_gte',
    dateEndParamKey: 'date_lte',
    notRepeatParam: 'repeat=false',
    repeatParam: 'repeat_ne=false',
  },
};

export const templates = {
  menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
  cartProduct: Handlebars.compile(document.querySelector(select.templateOf.cartProduct).innerHTML),
  bookingWidget: Handlebars.compile(document.querySelector(select.templateOf.bookingWidget).innerHTML),
  homeWidget: Handlebars.compile(document.querySelector(select.templateOf.homeWidget).innerHTML),
};
