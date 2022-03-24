import { RenderPosition, render, replace, remove } from '../utils/render.js';
import { isEscEvent } from '../utils/common.js';
import PointEditorView from '../view/point-editor.js';
import PointView from '../view/point-item.js';
import {UserAction, UpdateType, Mode} from '../view/const.js';



export default class TripPointPresenter {
  constructor(tripEventsMain, changeMode, changeData) {
    this._tripEventsMain = tripEventsMain;
    this._pointViewEditor = null;
    this._pointView = null;
    this._onEscPressDown = this._onEscPressDown.bind(this);
    this._mode = Mode.DEFAULT;
    this._changeMode = changeMode;
    this._changeData = changeData;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  start(point) {
    this._point = point;

    const prevPointView = this._pointView;
    const prevPointViewEditor = this._pointViewEditor;

    // console.log('222', prevPointView, prevPointViewEditor)

    this._pointViewEditor = new PointEditorView(point);
    this._pointView = new PointView(point);

    this._pointView.setRollupClickHandler(() => { this._replaceItemToForm(); });
    this._pointView.setFavoriteButtonHandler(() => { this._changeFavoriteButton(); });
    this._pointViewEditor.setSubmitFormHandler(this._handleFormSubmit);
    this._pointViewEditor.setRollupClickHandler(() => { this._replaceFormToItem(); });

    if (prevPointView === null || prevPointViewEditor === null) {
      render(this._tripEventsMain, this._pointView, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointView, prevPointView);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointViewEditor, prevPointViewEditor);
    }

    remove(prevPointView);
    remove(prevPointViewEditor);

  }


  destroy() {
    remove(this._pointView);
    remove(this._pointViewEditor);
  }

  _changeFavoriteButton() {
      this._changeData(
        UserAction.UPDATE,
        UpdateType.MINOR,
        Object.assign({}, this._point, { isFavorite: !this._point.isFavorite, },),
      );
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToItem();
    }
  }

  _replaceItemToForm() {
    replace(this._pointViewEditor, this._pointView);
    document.addEventListener('keydown', this._onEscPressDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToItem() {
    this._pointViewEditor.resetState(this._point);//, isSubmit, this._changeData);
    replace(this._pointView, this._pointViewEditor);
    document.removeEventListener('keydown', this._onEscPressDown);
    this._mode = Mode.DEFAULT;
  }

  _onEscPressDown(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._replaceFormToItem();
    }
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.UPDATE,
      UpdateType.MINOR,
      Object.assign({}, point));

    this._replaceFormToItem();
  }
}
