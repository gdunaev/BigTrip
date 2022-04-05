import { getPoints } from "./view/get-points.js";
import TripPresenter from "./presenter/trip.js";
import PointsModel from './model/points.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import {MenuItem, RenderPosition} from './view/const.js';
import { render } from "./utils/render.js";
import SiteMenuView from "./view/site-menu.js";
import StatisticsView from './view/statistics.js';
import InfoView from "./view/info.js";

const COUNT_POINT = 10;
const pageBodyMain = document.querySelector('.page-body__page-main');
const tripEventsMain = pageBodyMain.querySelector('.trip-events');
const tripControlsFilters = document.querySelector('.trip-controls__filters');


const points = getPoints(COUNT_POINT);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);
const filterModel = new FilterModel();


const tripMain = document.querySelector('.trip-main');
render(tripMain, new InfoView(pointsModel.getPoints()), RenderPosition.AFTERBEGIN);

const siteMenuComponent = new SiteMenuView();
// render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);

const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
render(tripControlsNavigation, siteMenuComponent, RenderPosition.BEFOREEND);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      // Показать доску
      // Скрыть статистику
      break;
    case MenuItem.STATS:
      // Скрыть доску
      // Показать статистику
      break;
  }
};
siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);



// const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointsModel);
// filterPresenter.init();

// const presenter = new TripPresenter(points, tripEventsMain, pointsModel, filterModel);
// presenter.start();

render(tripEventsMain, new StatisticsView(pointsModel.getPoints()), RenderPosition.BEFOREEND);


document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    presenter.createPoint();
  });
