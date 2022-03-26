import { AbstractView } from "./abstract.js";
import { SortMode } from "./const.js";

const createSortTemplate = (currentSortType) => {

    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${currentSortType === SortMode.DAY ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${currentSortType === SortMode.TIME ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${currentSortType === SortMode.PRICE ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-price">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`;

};

export default class SortView extends AbstractView {
    constructor(currentSortType) {
        super();
        this._sortModeChangeHandler = this._sortModeChangeHandler.bind(this);
        this._sortMode = null;
        this._currentSortType = currentSortType;
        // console.log('22', currentSortType)
    }

    getTemplate() {
        return createSortTemplate(this._currentSortType); //ДОРАБОТАТЬ!
    }

    _sortModeChangeHandler(evt) {
        if (evt.target.tagName !== 'INPUT') {
            return;
        }

        this._sortMode = SortMode[evt.target.value.replace('sort-', '').toUpperCase()];
        // console.log(this._sortMode)
        this._callback.sortModeChange(this._sortMode);
    }

    setSortModeChangeHandler(callback) {
        this._callback.sortModeChange = callback;
        this.getElement().addEventListener('click', this._sortModeChangeHandler);
    }
}
