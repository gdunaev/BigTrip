import { getPoints } from "./view/get-points.js";
import TripPresenter from "./presenter/trip.js";
import PointsModel from './model/points.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import {MenuItem, RenderPosition, UpdateType} from './const.js';
import { render, remove } from "./utils/render.js";
import SiteMenuView from "./view/site-menu.js";
import StatisticsView from './view/statistics.js';
import InfoView from "./view/info.js";
import Api from './api.js';

const COUNT_POINT = 10;
const pageBodyMain = document.querySelector('.page-body__page-main');
const tripEventsMain = pageBodyMain.querySelector('.trip-events');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const pageBodyContainer = pageBodyMain.querySelector('.page-body__container');

const AUTHORIZATION = 'Basic 1qAWDr5tGY7uJi9';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

// const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const api = new Api(END_POINT, AUTHORIZATION);


// const points = getPoints(COUNT_POINT);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();


const tripMain = document.querySelector('.trip-main');
render(tripMain, new InfoView(pointsModel.getPoints()), RenderPosition.AFTERBEGIN);

const siteMenuComponent = new SiteMenuView(MenuItem.TABLE);
render(tripMain, siteMenuComponent, RenderPosition.BEFOREEND);

let statisticsComponent = null;
const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointsModel);
const presenter = new TripPresenter(tripEventsMain, pointsModel, filterModel, api);

const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
render(tripControlsNavigation, siteMenuComponent, RenderPosition.BEFOREEND);

const handleSiteMenuClick = (menuItem) => {

  if(statisticsComponent !== null) {
    statisticsComponent.hide();
    remove(statisticsComponent);
    statisticsComponent = null;
  }

  switch (menuItem) {
    case MenuItem.TABLE:
      break;
    case MenuItem.STATS:
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(pageBodyContainer, statisticsComponent, RenderPosition.BEFOREEND);
      statisticsComponent.start();
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
presenter.start();

// statisticsComponent = new StatisticsView(pointsModel.getPoints());
// render(pageBodyContainer, statisticsComponent, RenderPosition.BEFOREEND);
// statisticsComponent.start();


document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    presenter.createPoint();
  });
// console.log('112')

api.getPoints().then((points) => {
  console.log(points)
  pointsModel.setPoints(points);
  render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
}).catch(() => {
  pointsModel.setPoints(UpdateType.INIT, []);
  render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
});

