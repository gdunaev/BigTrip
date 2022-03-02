import InfoView from "./view/info.js";
import NavigationView from "./view/navigation.js";

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

const presenter = new TripPresenter(points, tripEventsMain);

presenter.start();
