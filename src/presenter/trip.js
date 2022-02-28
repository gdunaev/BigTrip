import ListEmptyView from "../view/list-empty.js";
// import { renderPointItem } from "../utils/render.js";
import PointEditorView from "../view/point-editor.js"
import PointView from "../view/point-item.js";
import { RenderPosition, render } from "../utils/render.js";
import { updateItem } from "../utils/common.js";

import InfoView from "../view/info.js";
import TripPointPresenter from "./trip-point.js";
import { SortMode } from "../utils/render.js";
import FiltersView from "../view/filters.js";
import { getFuturePoints, getPastPoints } from "../view/dayjs.js";


export default class TripPresenter {
    constructor(points, tripEventsMain) {
        this._points = points;
        this._isEmpty = points.length === 0;
        this._listEmptyView = new ListEmptyView(this._isEmpty);
        this._infoPoints = new InfoView(points);
        this._filtersView = new FiltersView(points);
        this._tripEventsMain = tripEventsMain;
        this._pointPresenter = {};
        this._changeModePoint = this._changeModePoint.bind(this);
        this._handlePointChange = this._handlePointChange.bind(this);
        // this._handleSortModeChange = this._handleSortModeChange.bind(this);
        this._filterMode = null;
    }

    start() {
        if (this._isEmpty) {
            render(this._tripEventsMain, this._listEmptyView, RenderPosition.BEFOREEND);
            return;
        }

        this._renderMainInfo();
        this._renderPoints();
        this._renderFilters();
    }

    _handleFilterChange() {
      // - Сортируем задачи
      // - Очищаем список
      // - Рендерим список заново
      // console.log(filter);
      this._filterMode = this._filtersView._filter;
      // console.log(this._filterMode);
      // const cPoints = this._points.slice();
      if (SortMode.PAST === this._filterMode) {
        console.log(getPastPoints(this._points));
      }
      if (SortMode.FUTURE === this._filterMode) {
        console.log( getFuturePoints(this._points));
      }
      if (SortMode.EVERYTHING === this._filterMode) {
        console.log(this._points);
      }

    }

    // _renderSort() {
    //   render(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
    //   this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    // }

    _handlePointChange(updatedPoint) {
      this._points = updateItem(this._points, updatedPoint);
      this._pointPresenter[updatedPoint.id].start(updatedPoint);
    }

    _clearAllPoints() {
      Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    }

    _changeModePoint() {
        Object.values(this._pointPresenter).forEach((presenter) => presenter.resetView());
    }

    _renderPoint(point) {
        const pointPresenter = new TripPointPresenter(this._tripEventsMain, this._changeModePoint, this._handlePointChange);
        pointPresenter.start(point);
        this._pointPresenter[point.id] = pointPresenter;
    }

    _renderPoints() {
        this._points
            .forEach((point) => this._renderPoint(point));
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
}
