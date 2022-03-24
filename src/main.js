import { getPoints } from "./view/get-points.js";
import TripPresenter from "./presenter/trip.js";
import PointsModel from './model/points.js';


const COUNT_POINT = 10;
const pageBodyMain = document.querySelector('.page-body__page-main');
const tripEventsMain = pageBodyMain.querySelector('.trip-events');



const points = getPoints(COUNT_POINT);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const presenter = new TripPresenter(points, tripEventsMain, pointsModel);

presenter.start();
