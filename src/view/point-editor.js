import { AbstractView } from "./abstract.js";

const createPointEditTemplate = (point) => {

    const test = '';
    const { typePoint, offers, destination, basePrice, name, dateFromEdit, dateToEdit } = point;
    const typePointIcon = typePoint.toLowerCase();
    const cancelDelete = "Delete";

    const offersComponent = offers === undefined ? "" :
        offers.map((currentPoint) => {
            return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
        <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${currentPoint.title}</span>
          +€&nbsp;
          <span class="event__offer-price">${currentPoint.price}</span>
        </label>
    </div>`
        }).join(" ");

    const descriptionComponent = destination === undefined ? '' : destination[0].description;

    const photos = point.destination[0].pictures.map((currentPicture) => {
        return `<img class="event__photo" src="${currentPicture.src}" alt="Event photo">`
    }).join(" ");

    const photosAll = `<div class="event__photos-container">
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
            <img class="event__type-icon" width="17" height="17" src="img/icons/${typePointIcon}.png" alt="">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" checked>
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${typePoint}
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
            ${photosAll}
        </section>
      </section>
    </form>
  </li>
  </ul>
  `;

};


export default class PointEditorView extends AbstractView {
    constructor(point) {
        super();
        this._point = point;
        this._setSubmitHandler = this._setSubmitHandler.bind(this);
        this._setResetHandler = this._setResetHandler.bind(this);
        this._setRollupClick = this._setRollupClick.bind(this);
    }
    getTemplate() {
        return createPointEditTemplate(this._point);
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
        this._callback.resetClick();
    }
    setResetClickHandler(callback) {
        this._callback.resetClick = callback;
        this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._setResetHandler);
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
