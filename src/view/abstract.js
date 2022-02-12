import { createElementDom } from "./util.js";

export default class Abstract {
    constructor() {
        if (new.target === Abstract) {
            throw new Error('Can not instantiate Abstract, only concrete one.');
        }
        this._element = null;
       this._callback = {};
    }

    getTemplate() {
        throw new Error('Abstract metod not implemented: getTemplate');
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
