/* eslint-disable arrow-parens */
import SmartView from './smart.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
// import { POINT_DESCRIPTION, POINT_NAME } from './mock.js';
import { setDatesFields, getDateEdit } from './dayjs.js';
import he from 'he';
import { OFFER, POINT_DESCRIPTION, POINT_NAME } from '../model/points.js';
// import dayjs from 'dayjs';


const FORMAT_DATE = 'd/m/y H:i';
const TypeDate = {
  START: 'start',
  END: 'end',
};

const getOfferComponent = (offers) => {
  
  if  (offers === undefined) {
    // console.log(document.querySelector('.event__section'))
    // document.querySelector('.event__section--offers').style.display = 'none';
    return '';
  } else {

    return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${offers.map((currentPoint, index) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${index}" type="checkbox" name="event-offer-luggage" ${currentPoint.checked === true ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-luggage-${index}">
        <span class="event__offer-title">${currentPoint.title}</span>
        +€&nbsp;
        <span class="event__offer-price">${currentPoint.price}</span>
      </label>
    </div>`).join(' ')}
    </div>
  </section>`;
  }

};

const createPointEditTemplate = (state) => {

  //  console.log(state)


  const { typePoint, dateFromState, dateToState, typePointState, destinationState, priceState } = state;

  // console.log(state)


  //отрисовка состояния при смене типа и места назначения.
  let typePointIconTemplate = typePointState !== '' ? typePointState : typePoint.toLowerCase();
  const typePointTemplate = typePointState !== '' ? typePointState : typePoint;
  const offers = typePointState !== '' ? OFFER.get(typePointState) : state.offers !== [] ? state.offers : [];

  // console.log('22', OFFER)
  const destination = destinationState.name !== '' ? POINT_DESCRIPTION.get(destinationState.name) : state.destination;
  const name = destination === undefined ? '' : destination.name;
  const descriptionComponent = destination === undefined ? '' : destination.description;
  const photos = destination === undefined ? '' : destination.pictures.map((currentPicture) => `<img class="event__photo" src="${currentPicture.src}" alt="Event photo">`).join(' ');
  // console.log('66', getDateEdit(state.dateFrom), )
  // debugger;
  const dateFromEdit = dateFromState !== '' ? dateFromState : state.dateFrom !== '' ? getDateEdit(state.dateFrom) : '';

  // console.log('66',state.dateFrom)

  const dateToEdit = dateToState !== '' ? dateToState : state.dateTo !== '' ? getDateEdit(state.dateTo) : '';
  const price = priceState !== '' ? priceState : state.basePrice;
  const cancelDelete = 'Delete';

  //подставляем наименование точек
  let dataListTemplate = '';


  POINT_NAME.forEach((point_name) => {
    return dataListTemplate = dataListTemplate + ` <option value="${point_name}">${point_name}</option>`;
  });

  typePointIconTemplate = typePointIconTemplate !== '' ? `img/icons/${typePointIconTemplate}.png` : '';

  const offersComponent = getOfferComponent(offers);
  
 

  // offersComponent = offersComponent === '' ? '' : 
  //       `<section class="event__section  event__section--offers">
  //         <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  //         <div class="event__available-offers">
  //         ${offersComponent}
  //         </div>
  //       </section>`;

  const photosComponent = `<div class="event__photos-container">
                   <div class="event__photos-tape">
                       ${photos}
                     </div>
                   </div>`;

  // console.log('66',  dataListTemplate, dateFromEdit);
  //,  dataListTemplate,  dateFromEdit, dateToEdit,price, cancelDelete,
  //       offersComponent, descriptionComponent, photosComponent)
  //  debugger;
  // photosComponent1

  return `<ul class="trip-events__list">
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="${typePointIconTemplate}" alt="">
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
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(name)}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${dataListTemplate}
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
          <input class="event__input  event__input--price" id="event-price-1" type="number" min = "0" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${cancelDelete}</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">
        
      ${offersComponent}

      
        
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
    this._setRollupClick = this._setRollupClick.bind(this);
    this._dateFromPicker = null;
    this._dateToPicker = null;
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);

    // console.log('666', this._point);
    this._state = PointEditorView.parseDataToState(this._point);
    this._changeEventTypeHandler = this._changeEventTypeHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._offerClickHandler = this._offerClickHandler.bind(this);


    // console.log('444', this._point);
    this._setInnerHandlers();
    //  console.log('33', );
  }

  // Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более ненужный календарь
  removeElement() {
    super.removeElement();

    if (this._dateFromPicker) {
      this._dateFromPicker.destroy();
      this._dateFromPicker = null;
    }
    if (this._dateToPicker) {
      this._dateToPicker.destroy();
      this._dateToPicker = null;
    }
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointEditorView.parseDataToState(this._point));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  resetState(point) {
    this.updateData(
      PointEditorView.parseDataToState(point),
    );
  }

  _setInnerHandlers() {
    // console.log('44')
    // console.log('88', this.getElement())
    this.getElement().querySelector('.event__type-list').addEventListener('click', this._changeEventTypeHandler);
    this._setDateFromPicker();
    this._setDateToPicker();

    this.getElement().querySelector('#event-destination-1').addEventListener('input', this._destinationInputHandler);
    this.getElement().querySelector('#event-price-1').addEventListener('input', this._priceInputHandler);
    // const offerInputs = this.getElement().querySelectorAll('.event__offer-selector');
    // offerInputs.forEach(element => element.addEventListener('click', this._offerClickHandler));

     this.getElement().querySelector('.event__details').addEventListener('click', this._offerClickHandler);
  }

  _checkDectination(dectinationName) {
    if (POINT_DESCRIPTION.get(dectinationName) === undefined) {
      return true;
    }
    return false;
  }

  _offerClickHandler(evt) {

    // const parentElement = evt.target.parentElement;

    //запомним все индексы у выделенных
    const checkedIndexs = [];
    if (evt.target.tagName === 'INPUT') {
      const offers = document.querySelectorAll('.event__offer-checkbox');
      offers.forEach((offer, key) => {
        if (offer.checked) {
          checkedIndexs.push(key);
        }
      });
      // checkedIndexs.push(offer);
      // console.log(offers)
        // console.log('22', checkedIndexs)

      this.updateData({
        offersState: checkedIndexs,
      }, true);
    }


    // evt.target.checked = !evt.target.checked;

    // console.log('22', evt.target)

    // evt.preventDefault();

  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      priceState: Number(evt.target.value),
    }, true);
  }

  _destinationInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      dectinationState: {
        name: evt.target.value,
        description: '',
        pictures: [],
      }
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
      dateFromPicker: this._dateFromPicker.selectedDates,
    });
  }

  _dateToChangeHandler() {
    this.updateData({
      dateToState: this.getElement().querySelector(`#event-${TypeDate.END}-time-1`).value,
      dateToPicker: this._dateToPicker.selectedDates,
    });
  }

  _changeEventTypeHandler(evt) {

    if (evt.target.tagName === 'LABEL') {
      // console.log('11', evt.target.textContent)
      this.updateData({
        typePointState: (evt.target.textContent).toLowerCase(),
      });
    }
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setSubmitFormHandler(this._callback.submitClick);
    this.setRollupClickHandler(this._callback.rollupClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  static parseDataToState(data) {

    // console.log('22', data)
    return Object.assign({},
      data, {
      typePointState: '',
      destinationState: {
        name: '',
        description: '',
        pictures: []
      },
      dateFromState: '',
      dateToState: '',
      dateFromPicker: '',
      dateToPicker: '',
      priceState: '',
      offersState: [],
    },
    );
  }

  static setCheckOffer(offers, checkedIndexs) {
    const checkedOffers = offers.slice();
    checkedOffers.forEach((offer, index) => {
      offer.checked = false;
      if (checkedIndexs.includes(index)) {
        offer.checked = true;
      };
    });
    // console.log(checkedOffers, checkedIndexs)
    return checkedOffers;
  }

  static parseStateToData(state) {

    // console.log('00', state)

    //когда меняется тип точки - подставляем офферы из объекта (находим по имени типа точки),
    //если не меняется - берем те что были у этой точки.
    let offers = state.typePointState !== '' ? OFFER.get(state.typePointState) : state.offers;

    //  console.log('11', offers, state.offersState)

    //а после проверим если ли выбранные офферы, если есть - отредактируем офферы
    offers = state.offersState !== [] ? PointEditorView.setCheckOffer(offers, state.offersState) : offers;


    const data = Object.assign({}, state,
      Object.assign({},
        {
          typePoint: state.typePointState !== '' ? state.typePointState : state.typePoint,
          offers,
          name: state.destinationState.name !== '' ? state.destinationState.name : state.destination.name,
          destination: state.destinationState.name !== '' ? POINT_DESCRIPTION.get(state.destinationState) : state.destination,
          basePrice: state.priceState !== '' ? state.priceState : state.basePrice,
        },
      )
    );

    //  console.log('22', offers);

    // state.typePointState !== '' ?
    // PointEditorView.setCheckOffer(OFFER.get(state.typePointState), state.offersState) :
    // PointEditorView.setCheckOffer(state.offers, state.offersState),)


    delete data.typePointState;
    delete data.destinationState;
    delete data.dateFromState;
    delete data.dateToState;
    delete data.dateFromPicker;
    delete data.dateToPicker;
    delete data.priceState;
    delete data.offersState;

    return data;
  }

  getTemplate() {
    // let dfddf = createPointEditTemplate(this._state)
    // console.log('111', dfddf)
    return createPointEditTemplate(this._state);
  }

  _setSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.submitClick(PointEditorView.parseStateToData(this._state));//PointEditorView.parseStateToData(this._state)
  }

  setSubmitFormHandler(callback) {
    this._callback.submitClick = callback;
    this.getElement().querySelector('.event').addEventListener('submit', this._setSubmitHandler);
  }

  _setRollupClick(evt) {
    evt.preventDefault();
    this._callback.rollupClick();
  }

  setRollupClickHandler(callback) {
    this._callback.rollupClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._setRollupClick);
  }
}
