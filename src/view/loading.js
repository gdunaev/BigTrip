import { createElementDom } from "./util.js";

const createLoadingTemplate = (isLoading) => {

    if (isLoading) {
        return `<p class="trip-events__msg">Loading...</p>`;
    }
    return '';

};

export default class LoadingView {
    constructor(isLoading) {
        this._element = null;
        this._isLoading = isLoading;
    }

    getTemplate() {
        return createLoadingTemplate(this._isLoading);
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

