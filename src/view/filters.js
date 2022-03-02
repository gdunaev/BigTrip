import { AbstractView } from "./abstract.js";
import { FilterMode } from "../utils/render.js";


const createFiltersTemplate = () => {

    return `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-${FilterMode.EVERYTHING}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${FilterMode.EVERYTHING} checked>
      <label class="trip-filters__filter-label" for="filter-${FilterMode.EVERYTHING}">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-${FilterMode.FUTURE}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${FilterMode.FUTURE}>
      <label class="trip-filters__filter-label" for="filter-${FilterMode.FUTURE}">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-${FilterMode.PAST}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${FilterMode.PAST}>
      <label class="trip-filters__filter-label" for="filter-${FilterMode.PAST}">Past</label>
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
        if (evt.target.tagName !== 'INPUT') {
            return;
        }
        this._filter = FilterMode[evt.target.value.toUpperCase()];
        this._callback.filterChange();
    }

    setFilterChangeHandler(callback) {
        this._callback.filterChange = callback;
        this.getElement().addEventListener('click', this._filterChangeHandler);
    }
}
