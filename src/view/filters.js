import {AbstractView} from "./abstract.js";
import { SortMode } from "../utils/render.js";


const createFiltersTemplate = () => {

    return `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-${SortMode.EVERYTHING}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${SortMode.EVERYTHING} checked>
      <label class="trip-filters__filter-label" for="filter-${SortMode.EVERYTHING}">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-${SortMode.FUTURE}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${SortMode.FUTURE}>
      <label class="trip-filters__filter-label" for="filter-${SortMode.FUTURE}">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-${SortMode.PAST}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${SortMode.PAST}>
      <label class="trip-filters__filter-label" for="filter-${SortMode.PAST}">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

};

export default class FiltersView extends AbstractView {

  constructor() {
    super();
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._filter = null;
  }

  getTemplate() {
      return createFiltersTemplate();
  }

  _filterChangeHandler(evt) {
    if (evt.target.tagName !== 'INPUT' || this._filter === SortMode[evt.target.value.toUpperCase()]) {
      return;
    }
    this._filter = SortMode[evt.target.value.toUpperCase()];
    this._callback.filterChange();
  }

  setFilterChangeHandler(callback) {
    this._callback.filterChange = callback;
    this.getElement().addEventListener('click', this._filterChangeHandler);
  }
}

