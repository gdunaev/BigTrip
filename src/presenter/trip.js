import ListEmptyView from "../view/list-empty.js";
import { RenderPosition, render, FilterMode, SortMode } from "../utils/render.js";
import { updateItem, getSortPricePoints, getSortDayPoints, getSortTimePoints } from "../utils/common.js";

import InfoView from "../view/info.js";
import TripPointPresenter from "./trip-point.js";
import FiltersView from "../view/filters.js";
import { getFuturePoints, getPastPoints } from "../view/dayjs.js";
import NavigationView from "../view/navigation.js";
import SortView from "../view/sort.js";



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
        this._currentPoints = points;
        this._filterMode = null;
        this._sortMode = null;
        this._navigationView = new NavigationView(points);
        this._sortView = new SortView(this._points);
    }

    start() {
        if (this._isEmpty) {
            render(this._tripEventsMain, this._listEmptyView, RenderPosition.BEFOREEND);
            return;
        }
        this._renderMainInfo();
        this._renderNavigation();
        this._renderSort();
        this._renderPoints();
        this._renderFilters();
    }

    _handleFilterChange() {
        this._filterMode = this._filtersView._filter;
        document.getElementById('sort-day').checked = true;

        switch (this._filterMode) {
            case FilterMode.PAST:
                this._currentPoints = getPastPoints(this._points);
                break;
            case FilterMode.FUTURE:
                this._currentPoints = getFuturePoints(this._points);
                break;
            case FilterMode.EVERYTHING:
                this._currentPoints = this._points;
                break;
        }
        this._clearAllPoints();
        this._renderPoints();
    }

    _handleSortModeChange() {
        this._sortMode = this._sortView._sortMode;
        switch (this._sortMode) {
            case SortMode.DAY:
                this._currentPoints = getSortDayPoints(this._points);
                break;
            case SortMode.TIME:
                this._currentPoints = getSortTimePoints(this._points);
                break;
            case SortMode.PRICE:
                this._currentPoints = getSortPricePoints(this._points);
                break;
        }
        this._clearAllPoints();
        this._renderPoints();
    }

    _handlePointChange(updatedPoint) {
      //  console.log(update)
        this._points = updateItem(this._points, updatedPoint);
        // console.log(updatedPoint)
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
        this._currentPoints.forEach((point) => this._renderPoint(point));
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
        render(this._tripEventsMain, this._sortView, RenderPosition.BEFOREEND);
        this._sortView.setSortModeChangeHandler(() => { this._handleSortModeChange() });
    }
}
