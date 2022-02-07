import { getCumulativeDate } from "./dayjs.js";
import { createElementDom } from "./util.js";


const createInfoTemplate = (points) => {

    //маршрут (города)
    const mainTitle = points.length === 0 ?
        "" : points.map((currentPoint) => { return `${currentPoint.name}` }).join(` &mdash; `);

    //даты от и до
    const cumulativeDate = points.length === 0 ? '' : getCumulativeDate(points[0].dateFrom, points[points.length - 1].dateTo);

    //общая стоимость
    let fullCost = 0;
    fullCost = points.length === 0 ?
        0 : points.reduce((sum, current) => {

            return sum + current.basePrice +
                (current.offers === undefined ?
                    0 :
                    current.offers.reduce((sumOffers, currentOffer) => { return sumOffers + currentOffer.price }, 0));

        }, 0);


    return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${mainTitle}</h1>

    <p class="trip-info__dates">${cumulativeDate}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${fullCost}</span>
  </p>
</section>`;

}

class InfoView {
    constructor(points) {
        this._element = null;
        this._points = points;
    }

    getTemplate() {
        return createInfoTemplate(this._points);
    }

    getElement() {
        if (!this._element) {
            this._element = createElementDom(this.getTemplate());
        }
        return this._element;
    }

    removeElement() {
        this._element = null;
    }
}

export { InfoView };