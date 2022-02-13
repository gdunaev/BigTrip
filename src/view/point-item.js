import {AbstractView} from "./abstract.js";

const createPointItemTemplate = (point) => {


    const {
        isFavorite,
        offers,
        typePoint,
        dateFromOnlyDate,
        dateFromMonthDay,
        name,
        dateFromHourMinute,
        dateFromHour,
        dateToHourMinute,
        dateToHour,
        pointDuration,
        basePrice
    } = point;


    const activeFavorite = isFavorite === true ? "event__favorite-btn--active" : "";

    let offersComponent = '';
    if (offers !== undefined) {
        for (const elem of offers) {
            offersComponent = `${offersComponent}<li class="event__offer">
                    <span class="event__offer-title">${elem['title']}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${elem['price']}</span>
                  </li>`;
        }
    }

    const typePointIcon = typePoint.toLowerCase();

    return `<ul class="trip-events__list">
            <li class="trip-events__item">
              <div class="event">
              <time class="event__date" datetime=${dateFromOnlyDate}>${dateFromMonthDay}</time>
              <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${typePointIcon}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${typePoint} ${name}</h3>
              <div class="event__schedule">
                <p class="event__time">
                <time class="event__start-time" datetime=${dateFromHourMinute}>${dateFromHour}</time>
                  &mdash;
                <time class="event__end-time" datetime=${dateToHourMinute}>${dateToHour}</time>
                </p>
                <p class="event__duration">${pointDuration}</p>
              </div>
              <p class="event__price">
                 &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
              </p>
              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                ${offersComponent}
              </ul>
              <button class="event__favorite-btn ${activeFavorite}" type="button">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
              </button>
              <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
              </button>
              </div>
            </li>
          </ul>`;

};

export default class PointView extends AbstractView {
  constructor(point) {
      super();
      this._point = point;
      this._getRollupClick = this._getRollupClick.bind(this);
  }
  getTemplate() {
      return createPointItemTemplate(this._point);
  }
  _getRollupClick(evt) {
    evt.preventDefault();
    this._callback.rollupClick();
  }
  getRollupClickHandler(callback) {
    this._callback.rollupClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._getRollupClick);
  }
}
