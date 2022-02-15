import ListEmptyView from "../view/list-empty.js";
// import { renderPointItem } from "../utils/render.js";
import PointEditorView from "../view/point-editor.js"
import PointView from "../view/point-item.js";
import { RenderPosition, render } from "../utils/render.js";

import InfoView from "../view/info.js";
import TripPointPresenter from "./trip-point.js";


export default class Trip {
    constructor(points, tripEventsMain) {
        this._points = points;
        this._isEmpty = points.length === 0 ? true : false;
        this._listEmptyView = new ListEmptyView(this._isEmpty);
        this._infoPoints = new InfoView(points);
        this._tripEventsMain = tripEventsMain;
        this._pointPresenter = {};
        this._changeModePoint = this._changeModePoint.bind(this);
    }

    start() {
        if (this._isEmpty) {
            render(this._tripEventsMain, this._listEmptyView, RenderPosition.BEFOREEND);
            return;
        }

        this._renderMainInfo();
        this._renderPoints();
    }

    _changeModePoint() {
        // console.log(this)
        Object
            .values(this._pointPresenter)
            .forEach((presenter) => presenter.resetView());
    }

    _renderPoint(point) {
        const pointPresenter = new TripPointPresenter(this._tripEventsMain, this._changeModePoint);
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
