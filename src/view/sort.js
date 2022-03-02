import { AbstractView } from "./abstract.js";
import { SortMode } from "../utils/render.js";

const createSortTemplate = () => {

    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortMode.DAY}" checked>
      <label class="trip-sort__btn" for="sort-${SortMode.DAY}">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortMode.EVENT}" disabled>
      <label class="trip-sort__btn" for="sort-${SortMode.EVENT}">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortMode.TIME}">
      <label class="trip-sort__btn" for="sort-${SortMode.TIME}">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortMode.PRICE}">
      <label class="trip-sort__btn" for="sort-${SortMode.PRICE}">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortMode.OFFER}" disabled>
      <label class="trip-sort__btn" for="sort-${SortMode.OFFER}">Offers</label>
    </div>
  </form>`;

};

export default class SortView extends AbstractView {
    constructor() {
        super();
        this._sortModeChangeHandler = this._sortModeChangeHandler.bind(this);
        this._sortMode = null;
    }

    getTemplate() {
        return createSortTemplate();
    }

    _sortModeChangeHandler(evt) {
        if (evt.target.tagName !== 'INPUT') {
            return;
        }
        this._sortMode = SortMode[evt.target.value.replace('sort-', '').toUpperCase()];
        this._callback.sortModeChange();
    }

    setSortModeChangeHandler(callback) {
        this._callback.sortModeChange = callback;
        this.getElement().addEventListener('click', this._sortModeChangeHandler);
    }
}
