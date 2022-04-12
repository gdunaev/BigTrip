import ListEmptyView from "../view/list-empty.js";
import { render, remove } from "../utils/render.js";
import { getSortPricePoints, getSortDayPoints, getSortTimePoints } from "../utils/common.js";
import InfoView from "../view/info.js";
import TripPointPresenter from "./trip-point.js";
import FiltersView from "../view/filter-view.js";
import { getFuturePoints, getPastPoints } from "../view/dayjs.js";
import SiteMenuView from "../view/site-menu.js";
import SortView from "../view/sort.js";
import { Mode, UpdateType, UserAction, FilterType, RenderPosition, SortMode } from "../const.js";
import PointNewPresenter from "./trip-point-new.js";
import LoadingView from '../view/loading.js';



export default class TripPresenter {
  constructor(tripEventsMain, pointsModel, filterModel, api) {
    this._isEmpty = false;
    this._listEmptyView = new ListEmptyView(this._isEmpty);
    this._infoPoints = new InfoView();
    this._filtersView = new FiltersView(FilterType.EVERYTHING);
    this._tripEventsMain = tripEventsMain;
    this._pointPresenter = {};
    this._changeModePoint = this._changeModePoint.bind(this);

    this._currentMode = '';
    this._filterType = null;
    this._sortMode = SortMode.DAY;
    // this._siteMenuView = new SiteMenuView(points);
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._sortView = null;
    this._handleSortModeChange = this._handleSortModeChange.bind(this);
    this._pointNewPresenter = new PointNewPresenter(this._handleViewAction);

    this._isLoading = true;
    this._loadingComponent = new LoadingView();
    this._api = api;
  }

  start() {
    if (this._isEmpty) {
      render(this._tripEventsMain, this._listEmptyView, RenderPosition.BEFOREEND);
      return;
    }
    // this._renderMainInfo();
    // this._renderNavigation();
    this._renderPoints();
  }

  //при нажатии на кнопку "Добавить новую (New event)"
  createPoint() {
    // console.log('11222')
    this._sortMode = SortMode.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.start();
  }

  //получает точки (с сортировкой или фильтрацией) перед отрисовкой
  _getPoints() {
    this._filterType = this._filterModel.getActiveFilter();

    const points = this._pointsModel.getPoints();

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

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE:
        this._pointsModel.updatePoint(updateType, update);

        this._api.updateTask(update).then((response) => {
          this._tasksModel.updateTask(updateType, response);
        });

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
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[point.id].start(point);
        break;
      case UpdateType.MINOR:
        this._clearAllPoints();
        this._renderPoints();
        break;
      case UpdateType.MAJOR:
        this._clearAllPoints({ setCurrentMode: true, resetSortType: true });
        this._renderPoints();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderPoints();
        break;
    }
  }

  _renderLoading() {
    // render(this._boardComponent, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _clearAllPoints({ setCurrentMode = false, resetSortType = false } = {}) {

    this._pointNewPresenter.destroy();
    Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortView);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._sortMode = SortMode.DAY;
    }

    //если обновление типа MAJOR (это значит что нажата смена фильтров),
    //то устанавливаем текущий режим сортировки точек.
    if(setCurrentMode) {
      this._currentMode = Mode.FILTER;
    }
  }

  _handleSortModeChange(sortMode) {
    if (this._sortMode === sortMode) {
      return;
    }
    this._currentMode = Mode.SORT;
    this._sortMode = sortMode;

    this._clearAllPoints();//
    this._renderPoints();
  }

  _changeModePoint() {
    this._pointNewPresenter.destroy(); //закрывает открытую форму новой точки
    Object.values(this._pointPresenter).forEach((presenter) => presenter.resetView());
  }

  _renderPoint(point) {
    const pointPresenter = new TripPointPresenter(this._tripEventsMain, this._changeModePoint, this._handleViewAction,);
    pointPresenter.start(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {

    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const points = this._getPoints();
    const pointCount = points.length;

    if (pointCount === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();

    points.forEach((point) => this._renderPoint(point));
  }

  _renderNoTasks() {
    render(this._boardComponent, this._noTaskComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilters() {
    const tripControlsFilters = document.querySelector('.trip-controls__filters');
    render(tripControlsFilters, this._filtersView, RenderPosition.BEFOREEND);
    this._filtersView.setFilterChangeHandler(() => { this._handleFilterChange() });
  }


  _renderSort() {
    if (this._sortView !== null) {
      this._sortView = null;
    }

    this._sortView = new SortView(this._sortMode);
    this._sortView.setSortModeChangeHandler(this._handleSortModeChange);

    render(this._tripEventsMain, this._sortView, RenderPosition.BEFOREEND);
  }
}
