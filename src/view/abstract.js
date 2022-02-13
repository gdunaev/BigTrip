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
}

export {AbstractView}
