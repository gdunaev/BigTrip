import { getPoints } from "./view/get-points.js";
import TripPresenter from "./presenter/trip.js";
import PointsModel from './model/points.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import {MenuItem, RenderPosition} from './view/const.js';
import { render, remove } from "./utils/render.js";
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

const siteMenuComponent = new SiteMenuView(MenuItem.TABLE);
render(tripMain, siteMenuComponent, RenderPosition.BEFOREEND);



let statisticsComponent = null;
const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointsModel);
const presenter = new TripPresenter(points, tripEventsMain, pointsModel, filterModel);



const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
render(tripControlsNavigation, siteMenuComponent, RenderPosition.BEFOREEND);

const handleSiteMenuClick = (menuItem) => {
  //  console.log('11', menuItem)
  // siteMenuComponent.setMenuItem(MenuItem.STATS);

  switch (menuItem) {
    case MenuItem.TABLE:
      // presenter.start();
      // console.log('33', menuItem)
      // remove(statisticsComponent);
      break;
    case MenuItem.STATS:
      // presenter.destroy();
      // statisticsComponent = new StatisticsView(pointsModel.getPoints());
      // render(tripEventsMain, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};


siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
presenter.start();

statisticsComponent = new StatisticsView(pointsModel.getPoints());
render(pageBodyMain, statisticsComponent, RenderPosition.BEFOREEND);


document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    presenter.createPoint();
  });
