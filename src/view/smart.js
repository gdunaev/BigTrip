import {AbstractView} from './abstract';

export default class SmartView extends AbstractView {
  constructor() {
    super();
    this._state = {};
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._state = Object.assign(
      {},
      this._state,
      update,
    );

    // console.log(this._state)

    if (justDataUpdating) {
      return;
    }


    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}

// export {SmartView}
