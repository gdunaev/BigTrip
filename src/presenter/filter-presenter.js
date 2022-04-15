import FilterView from '../view/filter-view.js';
import {render, replace, remove} from '../utils/render.js';
import {FilterType, UpdateType, RenderPosition} from '../const.js';



export default class FilterPresenter {

  constructor(filterContainer, filterModel, pointsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._pointsModel = pointsModel;

    this._filtersView = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    // console.log('222')
    const filters = this._getFilters();
    const prevFilterView = this._filtersView;

    this._filtersView = new FilterView(filters, this._filterModel.getActiveFilter());
    this._filtersView.setFilterChangeHandler(this._handleFilterTypeChange);

    // const tripControlsFilters = document.querySelector('.trip-controls__filters');
    // render(tripControlsFilters, this._filtersView, RenderPosition.BEFOREEND);
    // this._filtersView.setFilterChangeHandler(() => { this._handleFilterChange() });

    if (prevFilterView === null) {
      render(this._filterContainer, this._filtersView, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filtersView, prevFilterView);
    remove(prevFilterView);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    //  console.log('22', filterType)
    if (this._filterModel.getActiveFilter() === filterType) {
      return;
    }

    // this._currentMode = Mode.FILTER;
    // this._filterType = this._filtersView._filter;
    // console.log('33', filterType)
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    return [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
      },
      {
        type: FilterType.FUTURE,
        name: 'Future',
      },
      {
        type: FilterType.PAST,
        name: 'Past',
      },
      // {
      //   type: FilterType.FAVORITES,
      //   name: 'Favorites',
      //   count: filter[FilterType.FAVORITES](tasks).length,
      // },
      // {
      //   type: FilterType.REPEATING,
      //   name: 'Repeating',
      //   count: filter[FilterType.REPEATING](tasks).length,
      // },
      // {
      //   type: FilterType.ARCHIVE,
      //   name: 'Archive',
      //   count: filter[FilterType.ARCHIVE](tasks).length,
      // },
    ];
  }
}
