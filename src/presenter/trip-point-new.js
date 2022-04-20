import { render, remove } from '../utils/render.js';
import { isEscEvent } from '../utils/common.js';
import PointEditorView from '../view/point-editor.js';
import { UserAction, UpdateType, ModeEditing, RenderPosition } from '../const.js';
import { nanoid } from 'nanoid';


export default class PointNewPresenter {
    constructor(changeData) {
      this._tripEventsTripSort = null;
        this._pointViewEditor = null;
        this._mode = ModeEditing.DEFAULT;
        this._changeData = changeData;
        this._state = this._getEmptyPoint();
        this._onEscPressDown = this._onEscPressDown.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._setDeleteHandler = this._setDeleteHandler.bind(this);
    }

    _getEmptyPoint() {
        return {
            'id': '',
            'typePoint': '',
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
            'destination': {
                'name': '',
                'description': '',
                'pictures': [],
              },
            'isFavorite': '',
            'offers': [],
        };
    }


    start(points) {
      // console.log('33344')
        if (this._pointViewEditor !== null) {
            return;
        }
        this._tripEventsTripSort = document.querySelector('.trip-events__trip-sort');
        this._points = points;
        this._pointViewEditor = new PointEditorView(this._state);
        this._pointViewEditor.setSubmitFormHandler(this._handleFormSubmit);
        this._pointViewEditor.setDeleteClickHandler(this._setDeleteHandler);
        this._pointViewEditor.setRollupClickHandler(this._setDeleteHandler);
        document.addEventListener('keydown', this._onEscPressDown);
        document.querySelector('.trip-main__event-add-btn').disabled = true;

        render(this._tripEventsTripSort, this._pointViewEditor, RenderPosition.AFTEREND);
    }


    _setDeleteHandler() {
        this.destroy();
    }

    destroy() {
        if (this._pointViewEditor === null) {
            return;
        }

        remove(this._pointViewEditor);
        this._pointViewEditor = null;

        document.removeEventListener('keydown', this._onEscPressDown);
        document.querySelector('.trip-main__event-add-btn').disabled = false;
    }

    _onEscPressDown(evt) {
        if (isEscEvent(evt)) {
            evt.preventDefault();
            this.destroy();
        }
    }

    _handleFormSubmit(point) {
         console.log('11', point)
        this._changeData(
            UserAction.ADD,
            UpdateType.MINOR,
            Object.assign({}, point, { id: `${this._points.length}`}));
        this.destroy();
    }
}
