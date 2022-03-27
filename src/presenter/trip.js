import ListEmptyView from "../view/list-empty.js";
import { render, remove } from "../utils/render.js";
import { getSortPricePoints, getSortDayPoints, getSortTimePoints } from "../utils/common.js";

import InfoView from "../view/info.js";
import TripPointPresenter from "./trip-point.js";
import FiltersView from "../view/filter-view.js";
import { getFuturePoints, getPastPoints } from "../view/dayjs.js";
import NavigationView from "../view/navigation.js";
import SortView from "../view/sort.js";
import { Mode, UpdateType, UserAction, FilterType, RenderPosition, SortMode } from "../view/const.js";

// const filters = [
//   {
//     type: 'everething',
//     name: 'EVERYTHING',
//   },
// ];



export default class TripPresenter {
    constructor(points, tripEventsMain, pointsModel, filterModel) {
        // this._points = points;
        this._isEmpty = points.length === 0;
        this._listEmptyView = new ListEmptyView(this._isEmpty);
        this._infoPoints = new InfoView(points);
        this._filtersView = new FiltersView(FilterType.EVERYTHING);
        this._tripEventsMain = tripEventsMain;
        this._pointPresenter = {};
        this._changeModePoint = this._changeModePoint.bind(this);
        //
        this._currentMode = '';
        this._filterType = null;
        this._sortMode = SortMode.DAY;
        this._navigationView = new NavigationView(points);
        // this._sortView = new SortView(this._points);

        this._pointsModel = pointsModel;
        this._filterModel = filterModel;
        this._handleViewAction = this._handleViewAction.bind(this);
        this._handleModelEvent = this._handleModelEvent.bind(this);
        // this._handlePointChange = this._handlePointChange.bind(this);

        this._pointsModel.addObserver(this._handleModelEvent);
        this._filterModel.addObserver(this._handleModelEvent);

        this._sortView = null;
        this._handleFilterChange = this._handleFilterChange.bind(this);
        this._handleSortModeChange = this._handleSortModeChange.bind(this);
    }

    start() {
        if (this._isEmpty) {
            render(this._tripEventsMain, this._listEmptyView, RenderPosition.BEFOREEND);
            return;
        }
        this._renderMainInfo();
        this._renderNavigation();
        // this._renderSort();
        this._renderPoints();
        // this._renderFilters();
    }

    _getPoints() {


     this._filterType = this._filterModel.getActiveFilter();
    // const filtredTasks = filter[filterType](tasks);

    // switch (this._currentSortType) {
    //   case SortType.DATE_UP:
    //     return filtredTasks.sort(sortTaskUp);
    //   case SortType.DATE_DOWN:
    //     return filtredTasks.sort(sortTaskDown);
    // }

    // return filtredTasks;

        const points = this._pointsModel.getPoints();

        console.log(this._filterType)

        //здесь текущий режим - Сортировка (день, время, цена) или Фильтрация (все, будущие, прошлые)
        if (this._currentMode === Mode.SORT) {
            switch (this._sortMode) {
                case SortMode.DAY:
                    return getSortDayPoints(points);
                case SortMode.TIME:
                    return getSortTimePoints(points);
                case SortMode.PRICE:
                    return getSortPricePoints(points);
            }
        }

        switch (this._filterType) {
            case FilterType.PAST:
                return getPastPoints(points);
            case FilterType.FUTURE:
                return getFuturePoints(points);
            case FilterType.EVERYTHING:
                return points;
        }

        return this._pointsModel.getPoints();
    }

    _handleFilterChange() {
        if (this._filterType === this._filtersView._filter) {
            return;
        }
        this._currentMode = Mode.FILTER;
        this._filterType = this._filtersView._filter;
        // document.getElementById('sort-day').checked = true;
        //  console.log(this._currentMode, this._filterType)

        this._clearAllPoints();
        this._renderPoints();
    }



    _handleViewAction(actionType, updateType, update) {
      // console.log(actionType, updateType, update);
      // Здесь будем вызывать обновление модели.
      // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
      // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
      // update - обновленные данные
      switch (actionType) {
        case UserAction.UPDATE:
          this._pointsModel.updatePoint(updateType, update);
          break;
        case UserAction.ADD:
          this._pointsModel.addPoint(updateType, update);
          break;
        case UserAction.DELETE:
          this._pointsModel.deletePoint(updateType, update);
          break;
      }
    }

    _handleModelEvent(updateType, point) {
       console.log(updateType, point);
      // В зависимости от типа изменений решаем, что делать:
      // - обновить часть списка (например, когда поменялось описание)
      // - обновить список (например, когда задача ушла в архив)
      // - обновить всю доску (например, при переключении фильтра)
      switch (updateType) {
        case UpdateType.PATCH:
          // - обновить часть списка (например, когда поменялось описание)
          this._pointPresenter[point.id].start(point);
          break;
        case UpdateType.MINOR:
          // - обновить список (например, когда задача ушла в архив)
          this._clearAllPoints();
          this._renderPoints();
          break;
        case UpdateType.MAJOR:
          // - обновить всю доску (например, при переключении фильтра)
          this._clearAllPoints({resetRenderedPointCount: true, resetSortType: true});
          this._renderPoints();
          break;
      }
    }

// {resetRenderedPointCount = false, resetSortType = false} = {}
  _clearAllPoints({ resetRenderedPointCount = false, resetSortType = false } = {}) {

    Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortView);

    if (resetSortType) {
      this._currentSortType = SortMode.DAY;
    }
    // console.log('111', this._currentSortType)
  }



  _handleSortModeChange(sortMode) {
    // console.log('222', this)

    if (this._sortMode === sortMode) {
      return;
    }
    this._currentMode = Mode.SORT;
    this._sortMode = sortMode;


    this._clearAllPoints({resetRenderedPointCount: true});//
    this._renderPoints();
  }

    _changeModePoint() {
        Object.values(this._pointPresenter).forEach((presenter) => presenter.resetView());
    }

    _renderPoint(point) {
        const pointPresenter = new TripPointPresenter(this._tripEventsMain, this._changeModePoint, this._handleViewAction,);
        pointPresenter.start(point);
        this._pointPresenter[point.id] = pointPresenter;
    }

    _renderPoints() {
      this._renderSort();

      this._getPoints().forEach((point) => this._renderPoint(point));
    }

    _renderMainInfo() {
        const tripMain = document.querySelector('.trip-main');
        render(tripMain, this._infoPoints, RenderPosition.AFTERBEGIN);
    }

    _renderFilters() {
        const tripControlsFilters = document.querySelector('.trip-controls__filters');
        render(tripControlsFilters, this._filtersView, RenderPosition.BEFOREEND);
        this._filtersView.setFilterChangeHandler(() => { this._handleFilterChange() });
    }

    _renderNavigation() {
        const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
        render(tripControlsNavigation, this._navigationView, RenderPosition.BEFOREEND);
    }

    _renderSort() {

        // console.log('111', this._sortMode)
        if (this._sortView !== null) {
          this._sortView = null;
        }

        this._sortView = new SortView(this._sortMode);
        this._sortView.setSortModeChangeHandler(this._handleSortModeChange);

        render(this._tripEventsMain, this._sortView, RenderPosition.BEFOREEND);
    }



}
