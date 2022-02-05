export const createContentItemTemplate = (point) => {


    const activeFavorite = point.isFavorite === true ? "event__favorite-btn--active" : "";

    let offers = '';
    if (point.offers !== undefined) {
        for (const elem of point.offers) {
            offers = `${offers}<li class="event__offer">
                    <span class="event__offer-title">${elem['title']}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${elem['price']}</span>
                  </li>`;
        }
    }

    const typePointIcon = point.typePoint.toLowerCase();

    return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime=${point.dateFromOnlyDate}>${point.dateFromMonthDay}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${typePointIcon}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${point.typePoint} ${point.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime=${point.dateFromHourMinute}>${point.dateFromHour}</time>
        &mdash;
        <time class="event__end-time" datetime=${point.dateToHourMinute}>${point.dateToHour}</time>
      </p>
      <p class="event__duration">${point.pointDuration}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offers}
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
</li>`;

};
