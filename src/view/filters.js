import { AbstractView } from "./abstract.js";
import { FilterType } from "../view/const.js";


const createFiltersTemplate = (currentFilterType) => {

    return `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${FilterType.EVERYTHING === currentFilterType ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${FilterType.FUTURE === currentFilterType ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${FilterType.PAST === currentFilterType ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

};

export default class FiltersView extends AbstractView {

    constructor(currentFilterType) {
        super();
        this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
        this._filter = null;
        this._currentFilter = currentFilterType;
    }

    getTemplate() {
        return createFiltersTemplate(this._currentFilter);
    }

    _filterTypeChangeHandler(evt) {
        if (evt.target.tagName !== 'INPUT') {
            return;
        }
        this._filter = FilterType[evt.target.value.toUpperCase()];
        this._callback.filterChange();
    }

    setFilterChangeHandler(callback) {
        this._callback.filterChange = callback;
        this.getElement().addEventListener('click', this._filterTypeChangeHandler);
    }
}
