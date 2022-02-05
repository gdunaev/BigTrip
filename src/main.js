import { createInfoTemplate } from "./view/info.js";
import { createNavigationTemplate } from "./view/navigation.js";
import { createFiltersTemplate } from "./view/filters.js";
import { createSortTemplate } from "./view/sort.js";
import { createContentTemplate } from "./view/content.js"
import { createContentItemTemplate } from "./view/content-item.js";
import { createOffersTemplate } from "./view/offers.js";
import { createDestinationTemplate } from "./view/destination.js";
import { createListEmptyTemplate } from "./view/list-empty.js";
import { createLoadingTemplate } from "./view/loading.js";
import { createStatsTemplate } from "./view/stats.js";

import { createPoint } from "./view/mock.js";

const PLACE_BEFORE = 'beforeend';
const PLACE_AFTER = 'afterbegin';
const COUNT_POINT = 10;


const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};


//главное инфо
const tripMain = document.querySelector('.trip-main');
render(tripMain, createInfoTemplate(), PLACE_AFTER);


//навигация
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
render(tripControlsNavigation, createNavigationTemplate(), PLACE_BEFORE);


//фильтры
const tripControlsFilters = document.querySelector('.trip-controls__filters');
render(tripControlsFilters, createFiltersTemplate(), PLACE_BEFORE);


//сортировка
const tripEvents = document.querySelector('.trip-events');
render(tripEvents, createSortTemplate(), PLACE_BEFORE);


const compareDataFrom = (elementA, elementB) => {
    const rankA = elementA.dateFrom;
    const rankB = elementB.dateFrom;
    return rankA - rankB;
};

const points = new Array(COUNT_POINT).fill().map(createPoint).sort(compareDataFrom);

const isEmpty = points.length === 0 ? true : false;

let tripEventsList = '';
for (let i = 0; i < points.length; i++) {
  if (i === 0) {
    //форма ввода/редактирования
     render(tripEvents, createContentTemplate(points[i]), PLACE_BEFORE);
     tripEventsList = tripEvents.querySelector('.trip-events__list');
  }
  render(tripEventsList, createContentItemTemplate(points[i]), PLACE_BEFORE);
}


//формы
const eventDetails = tripEvents.querySelector('.event__details');

// render(eventDetails, createOffersTemplate(), PLACE_BEFORE);

// render(eventDetails, createDestinationTemplate(), PLACE_BEFORE);

//нет данных
render(eventDetails, createListEmptyTemplate(isEmpty), PLACE_BEFORE);

//загрузка
render(eventDetails, createLoadingTemplate(false), PLACE_BEFORE);



const pageBodyMain = document.querySelector('.page-body__page-main');
const pageBodyContainer = pageBodyMain.querySelector('.page-body__container');
render(pageBodyContainer, createStatsTemplate(false), PLACE_BEFORE);
