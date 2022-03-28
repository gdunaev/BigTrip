import { render, remove } from '../utils/render.js';
import { isEscEvent } from '../utils/common.js';
import PointEditorView from '../view/point-editor.js';
import { UserAction, UpdateType, ModeEditing, RenderPosition } from '../view/const.js';
import { nanoid } from 'nanoid';


export default class PointNewPresenter {
    constructor(tripEventsMain, changeData) {
        this._tripEventsMain = tripEventsMain;
        this._pointViewEditor = null;
        this._mode = ModeEditing.DEFAULT;
        this._changeData = changeData;
        this._state = this._getEmptyPoint();
        this._onEscPressDown = this._onEscPressDown.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._setResetHandler = this._setResetHandler.bind(this);
    }

    _getEmptyPoint() {
        return {
            'id': '',
            'typePoint': '',
            'name': '',
            'basePrice': 0,
            'dateFrom': '',
            'dateFromOnlyDate': '',
            'dateFromMonthDay': '',
            'dateFromHourMinute': '',
            'dateFromHour': '',
            'dateFromEdit': '',
            'dateTo': '',
            'dateToHour': '',
            'dateToHourMinute': '',
            'dateToEdit': '',
            'pointDuration': '',
            'destination': undefined,
            'isFavorite': '',
            'offers': undefined,
        };
    }


    start() {
        // console.log('33', this._pointViewEditor)
        if (this._pointViewEditor !== null) {
            return;
        }
        this._pointViewEditor = new PointEditorView(this._state);
        this._pointViewEditor.setSubmitFormHandler(this._handleFormSubmit);
        this._pointViewEditor.setResetClickHandler(this._setResetHandler);
        document.addEventListener('keydown', this._onEscPressDown);

        render(this._tripEventsMain, this._pointViewEditor, RenderPosition.AFTERBEGIN);
    }


    _setResetHandler() {
        this.destroy();
    }

    destroy() {
        if (this._pointViewEditor === null) {
            return;
        }

        remove(this._pointViewEditor);
        this._pointViewEditor = null;

        document.removeEventListener('keydown', this._onEscPressDown);
    }

    _onEscPressDown(evt) {
        if (isEscEvent(evt)) {
            evt.preventDefault();
            this.destroy();
        }
    }

    _handleFormSubmit(point) {
        this._changeData(
            UserAction.ADD,
            UpdateType.MINOR,
            Object.assign({ id: nanoid() }, point));

        this.destroy();
    }
}
