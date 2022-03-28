import { getPoints } from "./view/get-points.js";
import TripPresenter from "./presenter/trip.js";
import PointsModel from './model/points.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';


const COUNT_POINT = 10;
const pageBodyMain = document.querySelector('.page-body__page-main');
const tripEventsMain = pageBodyMain.querySelector('.trip-events');
const tripControlsFilters = document.querySelector('.trip-controls__filters');



const points = getPoints(COUNT_POINT);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointsModel);
filterPresenter.init();

const presenter = new TripPresenter(points, tripEventsMain, pointsModel, filterModel);

presenter.start();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    presenter.createPoint();
  });
