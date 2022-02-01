import { createInfoTemplate } from "./view/info.js";
import { createNavigationTemplate } from "./view/navigation.js";
import { createFiltersTemplate } from "./view/filters.js";


const PLACE = 'beforeend';


const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};


//главное инфо
const tripMain = document.querySelector('.trip-main');
render(tripMain, createInfoTemplate(), 'afterbegin');


//навигация
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
render(tripControlsNavigation, createNavigationTemplate(), PLACE);


//фильтры
const tripControlsFilters = document.querySelector('.trip-controls__filters');
render(tripControlsFilters, createFiltersTemplate(), PLACE);


//сортировка
const tripEvents = document.querySelector('.trip-events');
render(tripEvents, createSortTemplate(), PLACE);
