import { createElementDom } from "../utils/render.js";

class AbstractView {
    constructor() {
        if (new.target === AbstractView) {
            throw new Error('Can not instantiate AbstractView, only concrete one.');
        }
        this._element = null;
       this._callback = {};
    }

    getTemplate() {
        throw new Error('AbstractView metod not implemented: getTemplate');
    }

    getElement() {
        if (!this._element) {
            this._element = createElementDom(this.getTemplate());
        }
        return this._element;
    }

    removeElement() {
        this._element = null;
    }
    show() {
      document.querySelector('.statistics').classList.remove('visually-hidden');
      document.querySelector('.trip-filters').classList.add('visually-hidden');

      document.querySelector('.trip-events').classList.add('visually-hidden');
      // document.querySelector('.page-body__page-main  page-main').className = 'statistics__visually';

    }

    hide() {
      document.querySelector('.statistics').classList.add('visually-hidden');
      document.querySelector('.trip-events').classList.remove('visually-hidden');
      document.querySelector('.trip-filters').classList.remove('visually-hidden');
      // document.querySelector('.statistics').className = 'statistics visually-hidden';
      // document.querySelector('.statistics__visually').className = 'statistics__visually visually-hidden';
    }
}

 export {AbstractView}
