import ListEmptyView from "../view/list-empty.js";
import { RenderPosition, render } from "../utils/render.js";
import { updateItem } from "../utils/common.js";

import InfoView from "../view/info.js";
import TripPointPresenter from "./trip-point.js";
import { SortMode } from "../utils/render.js";
import FiltersView from "../view/filters.js";
import { getFuturePoints, getPastPoints } from "../view/dayjs.js";
import NavigationView from "../view/navigation.js";


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
        this._currentPoints = points;
        this._filterMode = null;
        this._navigationView = new NavigationView(points);
    }

    start() {
        if (this._isEmpty) {
            render(this._tripEventsMain, this._listEmptyView, RenderPosition.BEFOREEND);
            return;
        }
        this._renderMainInfo();
        this._renderNavigation();
        this._renderPoints();

        this._renderFilters();

    }

    _handleFilterChange() {
        this._filterMode = this._filtersView._filter;
        switch (this._filterMode) {
            case SortMode.PAST:
                this._currentPoints = getPastPoints(this._points);
                break;
            case SortMode.FUTURE:
                this._currentPoints = getFuturePoints(this._points);
                break;
            case SortMode.EVERYTHING:
                this._currentPoints = this._points;
                break;
        }
        this._clearAllPoints();
        this._renderPoints();
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

}
