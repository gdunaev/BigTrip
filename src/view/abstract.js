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
      // console.log('55', this._element)
        if (!this._element) {
            this._element = createElementDom(this.getTemplate());
        }
        return this._element;
    }

    removeElement() {
      // console.log('88', this._element)
        this._element = null;
        // console.log('99', this._element)
    }

    show() {
      // document.querySelector('.statistics').classList.remove('visually-hidden');
      document.querySelector('.trip-filters').classList.add('visually-hidden');
      document.querySelector('.trip-events').classList.add('trip-events--hidden');
      document.querySelector('.trip-main__event-add-btn').disabled = true;
    }

    hide() {
      // document.querySelector('.statistics').classList.add('visually-hidden');
      document.querySelector('.trip-events').classList.remove('trip-events--hidden');
      document.querySelector('.trip-filters').classList.remove('visually-hidden');
      document.querySelector('.trip-main__event-add-btn').disabled = false;
    }
}

 export {AbstractView}
