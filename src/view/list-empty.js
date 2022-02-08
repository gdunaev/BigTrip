import { createElementDom } from "./util.js";

const createListEmptyTemplate = (isEmpty) => {
    if (isEmpty) {
        return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
    }
    return '';
};

export default class ListEmptyView {
    constructor(isEmpty) {
        this._element = null;
        this._isEmpty = isEmpty;
    }

    getTemplate() {
        return createListEmptyTemplate(this._isEmpty);
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

