import SmartView from './smart.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import { OFFER, POINT_DESCRIPTION } from './mock.js';

const FORMAT_DATE = 'd/m/y H:i';
const TypeDate = {
  START: 'start',
  END: 'end',
};

const createPointEditTemplate = (state) => {

  const test = '';
  const { typePoint, basePrice, dateFromState, dateToState, typePointState, dectinationState } = state;

  //отрисовка состояния при смене типа и места назначения.
  const typePointIconTemplate = typePointState !== null ? typePointState.toLowerCase() : typePoint.toLowerCase();
  const typePointTemplate = typePointState !== null ? typePointState : typePoint;
  const offers = typePointState !== null ? OFFER.get(typePointState) : state.offers;
  const destination = dectinationState !== null ? POINT_DESCRIPTION.get(dectinationState) : state.destination;
  const name = dectinationState !== null ? dectinationState : state.name;
  const dateFromEdit = dateFromState !== null ? dateFromState : state.dateFromEdit;
  const dateToEdit = dateToState !== null ? dateToState : state.dateToEdit;

  // console.log(dateFromState)
  // console.log(dateFromEdit)
  // console.log(this._dateFromPicker)
  const cancelDelete = 'Delete';


  // console.log(offers)

  const offersComponent = offers === undefined ? '' :
    offers.map((currentPoint) => `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
        <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${currentPoint.title}</span>
          +€&nbsp;
          <span class="event__offer-price">${currentPoint.price}</span>
        </label>
    </div>`).join(' ');

  const descriptionComponent = destination === undefined ? '' : destination[0].description;

  const photos = destination[0].pictures.map((currentPicture) => `<img class="event__photo" src="${currentPicture.src}" alt="Event photo">`).join(' ');

  const photosComponent = `<div class="event__photos-container">
                   <div class="event__photos-tape">
                       ${photos}
                     </div>
                   </div>`;


  return `<ul class="trip-events__list">
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${typePointIconTemplate}.png" alt="">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${typePointIconTemplate === 'taxi' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${typePointIconTemplate === 'bus' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${typePointIconTemplate === 'train' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${typePointIconTemplate === 'ship' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${typePointIconTemplate === 'drive' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${typePointIconTemplate === 'flight' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${typePointIconTemplate === 'check-in' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${typePointIconTemplate === 'sightseeing' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${typePointIconTemplate === 'restaurant' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${typePointTemplate}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="${test}"></option>
            <option value="${test}"></option>
            <option value="${test}"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromEdit}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToEdit}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${cancelDelete}</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>



      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
          ${offersComponent}
          </div>
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${descriptionComponent}</p>
            ${photosComponent}
        </section>
      </section>
    </form>
  </li>
  </ul>
  `;

};

export default class PointEditorView extends SmartView {
  constructor(point) {
    super();
    this._point = point;
    this._setSubmitHandler = this._setSubmitHandler.bind(this);
    this._setResetHandler = this._setResetHandler.bind(this);
    this._setRollupClick = this._setRollupClick.bind(this);
    this._dateFromPicker = null;
    this._dateToPicker = null;
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);

    this._state = PointEditorView.parseDataToState(this._point);
    this._changeEventTypeHandler = this._changeEventTypeHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._setInnerHandlers();
    // console.log('111')
  }

  reset(point) {
    // console.log('1112')
    this.updateData(
      PointEditorView.parseDataToState(point),
    );
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-list').addEventListener('click', this._changeEventTypeHandler);
    this._setDateFromPicker();
    this._setDateToPicker();
    this.getElement().querySelector('#event-destination-1').addEventListener('input', this._destinationInputHandler);
  }

  _checkDectination(dectination) {
    if (POINT_DESCRIPTION.get(dectination) === undefined) {
      return true;
    }
    return false;
  }

  _destinationInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      dectinationState: evt.target.value,
    }, this._checkDectination(evt.target.value));
  }

  _setDateFromPicker() {
    if (this._dateFromPicker) {
      this._dateFromPicker.destroy();
      this._dateFromPicker = null;
    }

    this._dateFromPicker = flatpickr(
      this.getElement().querySelector(`#event-${TypeDate.START}-time-1`), {
      dateFormat: FORMAT_DATE,
      enableTime: true,
      defaultDate: this.getElement().querySelector(`#event-${TypeDate.START}-time-1`).value,
      onChange: this._dateFromChangeHandler,
    },
    );
  }

  _setDateToPicker() {
    if (this._dateToPicker) {
      this._dateToPicker.destroy();
      this._dateToPicker = null;
    }

    this._dateToPicker = flatpickr(
      this.getElement().querySelector(`#event-${TypeDate.END}-time-1`), {
      dateFormat: FORMAT_DATE,
      enableTime: true,
      defaultDate: this.getElement().querySelector(`#event-${TypeDate.END}-time-1`).value,
      onChange: this._dateToChangeHandler,
    },
    );
  }

  _dateFromChangeHandler() {
    this.updateData({
      dateFromState: this.getElement().querySelector(`#event-${TypeDate.START}-time-1`).value,
    });
  }

  _dateToChangeHandler() {
    this.updateData({
      dateToState: this.getElement().querySelector(`#event-${TypeDate.END}-time-1`).value,
    });
  }

  _changeEventTypeHandler(evt) {
    if (evt.target.tagName === 'LABEL') {
      this.updateData({
        typePointState: evt.target.textContent,
      });
    }
  }


  restoreHandlers() {
    this._setInnerHandlers();
    this.setSubmitFormHandler(this._callback.submitClick);
    this.setRollupClickHandler(this._callback.rollupClick);
    this.setResetClickHandler(this._callback.resetClick);
  }

  static parseDataToState(data) {
    return Object.assign({},
      data, {
      typePointState: null,
      dectinationState: null,
      dateFromState: null,
      dateToState: null,
    },
    );
  }

  static parseStateToData(state) {
    data = Object.assign({}, state);

    delete data.typePointState;
    delete data.dectinationState;
    delete data.dateFromState;
    delete data.dateToState;

    return data;
  }


  getTemplate() {
    return createPointEditTemplate(this._state);
  }

  _setSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.submitClick();
  }

  setSubmitFormHandler(callback) {
    this._callback.submitClick = callback;
    this.getElement().querySelector('.event').addEventListener('submit', this._setSubmitHandler);
  }

  _setResetHandler(evt) {
    evt.preventDefault();
    // this.updateData({
    //   typePointState: null,
    //   dectinationState: null,
    // });
    // console.log('111')
    this._callback.resetClick();
  }

  setResetClickHandler(callback) {
    this._callback.resetClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._setResetHandler);
  }

  _setRollupClick(evt) {
    evt.preventDefault();
    // this.updateData({
    //   typePointState: null,
    //   dectinationState: null,
    // });
    this._callback.rollupClick();
  }

  setRollupClickHandler(callback) {
    this._callback.rollupClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._setRollupClick);
  }

}
