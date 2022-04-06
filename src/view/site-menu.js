import {AbstractView} from "./abstract.js";
import {MenuItem} from './const.js';

const createNavigationTemplate = (currentMenuItem) => {
  console.log('33',MenuItem.STATS === currentMenuItem);
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn ${MenuItem.TABLE === currentMenuItem ? 'trip-tabs__btn--active': ''}" value=${MenuItem.TABLE} href="#">${MenuItem.TABLE}</a>
    <a class="trip-tabs__btn ${MenuItem.STATS === currentMenuItem ? 'trip-tabs__btn--active': ''}" value=${MenuItem.STATS} href="#">${MenuItem.STATS}</a>
  </nav>`;

};



export default class SiteMenuView extends AbstractView {

  constructor(currentMenuItem) {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._currentMenuItem = currentMenuItem;
  }

  getTemplate() {
      return createNavigationTemplate(this._currentMenuItem);
  }

  _menuClickHandler(evt) {
    const menuItem = MenuItem[evt.target.textContent.toUpperCase()];
    // console.log('22', MenuItem[evt.target.textContent.toUpperCase()])
    // this._currentMenuItem = MenuItem[evt.target.textContent.toUpperCase()];
    // this.getElement();
    evt.preventDefault();
    this._callback.menuClick(menuItem);
  }

  setMenuClickHandler(callback) {
    // console.log('22')
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    // console.log('33', menuItem)

    const item = this.getElement().querySelector(`[value=${menuItem}]`);

    if (item !== null) {
      item.checked = true;
    }
  }
}


