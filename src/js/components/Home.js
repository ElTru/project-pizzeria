import {templates, select, classNames} from './../settings.js';
import Carousel from './Carousel.js';

class Home {
  constructor(element){
    const thisHome = this;

    thisHome.render(element);
    thisHome.initWidgets();
    thisHome.initActions();
  }

  render(element){
    const thisHome = this;
    const generatedHTML = templates.homeWidget();

    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    thisHome.dom.wrapper.innerHTML = generatedHTML;
    thisHome.dom.carouselWidget = thisHome.dom.wrapper.querySelector(select.widgets.carousel.wrapper);
    thisHome.dom.orderPageLink = thisHome.dom.wrapper.querySelector(select.home.orderPageLink);
    thisHome.dom.bookPageLink = thisHome.dom.wrapper.querySelector(select.home.bookPageLink);
    thisHome.pages = document.querySelector(select.containerOf.pages).children;
    thisHome.navLinks = document.querySelectorAll(select.nav.links);
  }

  initWidgets(){
    const thisHome = this;

    thisHome.carouselWidget = new Carousel (thisHome.dom.carouselWidget);
  }

  initActions(){
    const thisHome = this;

    thisHome.dom.orderPageLink.addEventListener('click', function(event) {
      event.preventDefault();
      thisHome.pages[0].classList.remove(classNames.pages.active);
      thisHome.navLinks[0].classList.remove(classNames.nav.active);
      thisHome.pages[1].classList.add(classNames.pages.active);
      thisHome.navLinks[1].classList.remove(classNames.nav.active);
    });

    thisHome.dom.bookPageLink.addEventListener('click', function(event) {
      event.preventDefault();
      thisHome.pages[0].classList.remove(classNames.pages.active);
      thisHome.navLinks[0].classList.remove(classNames.nav.active);
      thisHome.pages[2].classList.add(classNames.pages.active);
      thisHome.navLinks[2].classList.remove(classNames.nav.active);
    });
  }
}

export default Home;
