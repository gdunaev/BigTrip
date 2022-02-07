import { InfoView } from "./view/info.js";
import { createNavigationTemplate } from "./view/navigation.js";
import { createFiltersTemplate } from "./view/filters.js";
import { createSortTemplate } from "./view/sort.js";
import { createContentTemplate } from "./view/content.js"
import { createContentItemTemplate } from "./view/content-item.js";
import { createListEmptyTemplate } from "./view/list-empty.js";
import { createLoadingTemplate } from "./view/loading.js";
import { createStatsTemplate } from "./view/stats.js";
import { createPoint } from "./view/mock.js";
import { getPastPoints } from "./view/dayjs.js";
import { getFuturePoints } from "./view/dayjs.js";
import { renderTemplate, RenderPosition } from "./view/util.js";


const sixthElement = document.createElement('div'); // Создаём элемент div
sixthElement.classList.add('el'); // Добавляем класс 'el'
sixthElement.innerHTML = '<span>5</span>'; // Объявляем содержимое
console.log(sixthElement)

const COUNT_POINT = 10;
const pageBodyMain = document.querySelector('.page-body__page-main');
const tripEventsMain = pageBodyMain.querySelector('.trip-events');




const compareDataFrom = (elementA, elementB) => {
    const rankA = elementA.dateFrom;
    const rankB = elementB.dateFrom;
    return rankA - rankB;
};


//получение данных
const points = new Array(COUNT_POINT).fill().map(createPoint).sort(compareDataFrom);

const pastPoints = getPastPoints(points);

const futurePoints = getFuturePoints(points);


//главное инфо
const tripMain = document.querySelector('.trip-main');
renderTemplate(tripMain, new InfoView(points).getElement(), RenderPosition.AFTERBEGIN);


//навигация
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
renderTemplate(tripControlsNavigation, createNavigationTemplate(), RenderPosition.BEFOREEND);


//фильтры
const tripControlsFilters = document.querySelector('.trip-controls__filters');
renderTemplate(tripControlsFilters, createFiltersTemplate(), RenderPosition.BEFOREEND);


//сортировка
const tripEvents = document.querySelector('.trip-events');
renderTemplate(tripEvents, createSortTemplate(), RenderPosition.BEFOREEND);


const isEmpty = points.length === 0 ? true : false;

if (!isEmpty) {

    //форма ввода/редактирования
    renderTemplate(tripEvents, createContentTemplate(points[0]), RenderPosition.BEFOREEND);
    const tripEventsList = tripEvents.querySelector('.trip-events__list');

    for (let i = 1; i < points.length; i++) {
        renderTemplate(tripEventsList, createContentItemTemplate(points[i]), RenderPosition.BEFOREEND);
    }
}


//формы
if (isEmpty) {
    // const eventDetails = tripEvents.querySelector('.event__details');

    // renderTemplate(eventDetails, createOffersTemplate(), RenderPosition.BEFOREEND);

    // renderTemplate(eventDetails, createDestinationTemplate(), RenderPosition.BEFOREEND);

    //нет данных
    renderTemplate(tripEventsMain, createListEmptyTemplate(isEmpty), RenderPosition.BEFOREEND);

    //загрузка
    renderTemplate(tripEventsMain, createLoadingTemplate(false), RenderPosition.BEFOREEND);
}



// const pageBodyMain = document.querySelector('.page-body__page-main');
// const pageBodyContainer = pageBodyMain.querySelector('.page-body__container');
// renderTemplate(pageBodyContainer, createStatsTemplate(false), RenderPosition.BEFOREEND);
