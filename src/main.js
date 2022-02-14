import InfoView from "./view/info.js";
import NavigationView from "./view/navigation.js";
import FiltersView from "./view/filters.js";
import SortView from "./view/sort.js";

// import LoadingView from "./view/loading.js";
// import { createStatsTemplate } from "./view/stats.js";
// import { getPastPoints } from "./view/dayjs.js";
// import { getFuturePoints } from "./view/dayjs.js";
import { RenderPosition } from "./utils/render.js";
import { getPoints } from "./view/get-points.js";
import TripPresenter from "./presenter/trip.js";


const COUNT_POINT = 10;
const pageBodyMain = document.querySelector('.page-body__page-main');
const tripEventsMain = pageBodyMain.querySelector('.trip-events');


const points = getPoints(COUNT_POINT);


const renderSite = () => {

    const presenter = new TripPresenter(points, tripEventsMain);
    // console.log(presenter)

    //главное инфо
    const tripMain = document.querySelector('.trip-main');
    // renderElement(tripMain, new InfoView(points), RenderPosition.AFTERBEGIN);
    presenter.render(tripMain, new InfoView(points), RenderPosition.AFTERBEGIN);

    //навигация
    const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
    // renderElement(tripControlsNavigation, new NavigationView(), RenderPosition.BEFOREEND);
    presenter.render(tripControlsNavigation, new NavigationView(points), RenderPosition.BEFOREEND);

    //фильтры
    const tripControlsFilters = document.querySelector('.trip-controls__filters');
    // renderElement(tripControlsFilters, new FiltersView(), RenderPosition.BEFOREEND);
    presenter.render(tripControlsFilters, new FiltersView(points), RenderPosition.BEFOREEND);

    //сортировка
    // renderElement(tripEventsMain, new SortView(), RenderPosition.BEFOREEND);
    presenter.render(tripEventsMain, new SortView(points), RenderPosition.BEFOREEND);

    presenter.start();

}


renderSite();
