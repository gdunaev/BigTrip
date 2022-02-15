import { RenderPosition, render, replace } from "../utils/render.js";
import { isEscEvent } from "../utils/common.js";
import PointEditorView from "../view/point-editor.js";
import PointView from "../view/point-item.js";

export default class TripItem {
    constructor(tripEventsMain) {
        this._tripEventsMain = tripEventsMain;
        this._pointViewEditor = null;
        this._pointView = null;
        this._onEscPressDown = this._onEscPressDown.bind(this);
    }

    start(point) {
        this._pointViewEditor = new PointEditorView(point);
        this._pointView = new PointView(point);

        this._pointView.setRollupClickHandler(() => {
            this._replaceItemToForm();
        });
        // this._pointView.getFavoriteButtonHandler();
        this._pointViewEditor.setSubmitFormHandler(() => {
            this._replaceFormToItem();
        });
        // this._pointViewEditor.setResetClickHandler(this._replaceFormToItem);
        this._pointViewEditor.setRollupClickHandler(() => {
            this._replaceFormToItem();
        });

        render(this._tripEventsMain, this._pointView, RenderPosition.BEFOREEND);
    }

    _replaceItemToForm() {
        replace(this._pointViewEditor, this._pointView);
        document.addEventListener('keydown', this._onEscPressDown); //, { once: true }
    }

    _replaceFormToItem() {
        replace(this._pointView, this._pointViewEditor);
        document.removeEventListener('keydown', this._onEscPressDown);
    }

    _onEscPressDown(evt) {
        if (isEscEvent(evt)) {
            // console.log(this)
            evt.preventDefault();
            this._replaceFormToItem();
        }
    }
}
