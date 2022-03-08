import { getPoints } from "./view/get-points.js";
import TripPresenter from "./presenter/trip.js";


const COUNT_POINT = 10;
const pageBodyMain = document.querySelector('.page-body__page-main');
const tripEventsMain = pageBodyMain.querySelector('.trip-events');


const points = getPoints(COUNT_POINT);

const presenter = new TripPresenter(points, tripEventsMain);

presenter.start();
