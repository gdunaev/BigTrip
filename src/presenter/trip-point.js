import { render, replace, remove } from '../utils/render.js';
import { isEscEvent } from '../utils/common.js';
import PointEditorView from '../view/point-editor.js';
import PointView from '../view/point-item.js';
import {UserAction, UpdateType, ModeEditing, RenderPosition} from '../view/const.js';



export default class TripPointPresenter {
  constructor(tripEventsMain, changeMode, changeData) {
    this._tripEventsMain = tripEventsMain;
    this._pointViewEditor = null;
    this._pointView = null;
    this._onEscPressDown = this._onEscPressDown.bind(this);
    this._mode = ModeEditing.DEFAULT;
    this._changeMode = changeMode;
    this._changeData = changeData;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);

    this._handleDeleteClick = this._handleDeleteClick.bind(this);
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
    this._pointViewEditor.setDeleteClickHandler(this._handleDeleteClick);

    if (prevPointView === null || prevPointViewEditor === null) {
      render(this._tripEventsMain, this._pointView, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === ModeEditing.DEFAULT) {
      replace(this._pointView, prevPointView);
    }

    if (this._mode === ModeEditing.EDITING) {
      replace(this._pointViewEditor, prevPointViewEditor);
    }

    remove(prevPointView);
    remove(prevPointViewEditor);

  }

  // _handleFormSubmit(update) {
  //   // Проверяем, поменялись ли в задаче данные, которые попадают под фильтрацию,
  //   // а значит требуют перерисовки списка - если таких нет, это PATCH-обновление
  //   const isMinorUpdate =
  //     !isDatesEqual(this._task.dueDate, update.dueDate) ||
  //     isTaskRepeating(this._task.repeating) !== isTaskRepeating(update.repeating);

  //   this._changeData(
  //     UserAction.UPDATE_TASK,
  //     isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
  //     update,
  //   );
  //   this._replaceFormToCard();
  // }

  _handleDeleteClick(point) {
    this._changeData(
      UserAction.DELETE,
      UpdateType.MINOR,
      point,
    );
  }

  destroy() {
    remove(this._pointView);
    remove(this._pointViewEditor);
  }

  _changeFavoriteButton() {
      this._changeData(
        UserAction.UPDATE,
        UpdateType.PATCH,
        Object.assign({}, this._point, { isFavorite: !this._point.isFavorite, },),
      );
  }

  resetView() {
    if (this._mode !== ModeEditing.DEFAULT) {
      this._replaceFormToItem();
    }
  }

  _replaceItemToForm() {
    replace(this._pointViewEditor, this._pointView);
    document.addEventListener('keydown', this._onEscPressDown);
    this._changeMode();
    this._mode = ModeEditing.EDITING;
  }

  _replaceFormToItem() {
    this._pointViewEditor.resetState(this._point);//, isSubmit, this._changeData);
    replace(this._pointView, this._pointViewEditor);
    document.removeEventListener('keydown', this._onEscPressDown);
    this._mode = ModeEditing.DEFAULT;
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
