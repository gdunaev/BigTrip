import ListEmptyView from "../view/list-empty.js";
// import { renderPointItem } from "../utils/render.js";
import PointEditorView from "../view/point-editor.js"
import PointView from "../view/point-item.js";
import { RenderPosition, render } from "../utils/render.js";
import { updateItem } from "../utils/common.js";

import InfoView from "../view/info.js";
import TripPointPresenter from "./trip-point.js";


export default class Trip {
    constructor(points, tripEventsMain) {
        this._points = points;
        this._isEmpty = points.length === 0;
        this._listEmptyView = new ListEmptyView(this._isEmpty);
        this._infoPoints = new InfoView(points);
        this._tripEventsMain = tripEventsMain;
        this._pointPresenter = {};
        this._changeModePoint = this._changeModePoint.bind(this);
        this._handlePointChange = this._handlePointChange.bind(this);
    }

    start() {
        if (this._isEmpty) {
            render(this._tripEventsMain, this._listEmptyView, RenderPosition.BEFOREEND);
            return;
        }

        this._renderMainInfo();
        this._renderPoints();
    }

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
        // console.log(this._pointPresenter)
    }

    _renderMainInfo() {
        const tripMain = document.querySelector('.trip-main');
        render(tripMain, this._infoPoints, RenderPosition.AFTERBEGIN);
    }
}
