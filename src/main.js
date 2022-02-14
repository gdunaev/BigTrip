import InfoView from "./view/info.js";
import NavigationView from "./view/navigation.js";
import FiltersView from "./view/filters.js";
import SortView from "./view/sort.js";

// import LoadingView from "./view/loading.js";
// import { createStatsTemplate } from "./view/stats.js";
// import { getPastPoints } from "./view/dayjs.js";
// import { getFuturePoints } from "./view/dayjs.js";
import { RenderPosition, render } from "./utils/render.js";
import { getPoints } from "./view/get-points.js";
import TripPresenter from "./presenter/trip.js";


const COUNT_POINT = 10;
const pageBodyMain = document.querySelector('.page-body__page-main');
const tripEventsMain = pageBodyMain.querySelector('.trip-events');


const points = getPoints(COUNT_POINT);

// console.log(points)



const presenter = new TripPresenter(points, tripEventsMain);

//навигация
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
render(tripControlsNavigation, new NavigationView(points), RenderPosition.BEFOREEND);

//фильтры
const tripControlsFilters = document.querySelector('.trip-controls__filters');
render(tripControlsFilters, new FiltersView(points), RenderPosition.BEFOREEND);

//сортировка
render(tripEventsMain, new SortView(points), RenderPosition.BEFOREEND);

presenter.start();
