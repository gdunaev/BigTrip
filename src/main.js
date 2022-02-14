import InfoView from "./view/info.js";
import NavigationView from "./view/navigation.js";
import FiltersView  from "./view/filters.js";
import SortView from "./view/sort.js";
import ListEmptyView  from "./view/list-empty.js";
// import LoadingView from "./view/loading.js";
// import { createStatsTemplate } from "./view/stats.js";
// import { getPastPoints } from "./view/dayjs.js";
// import { getFuturePoints } from "./view/dayjs.js";
import { RenderPosition, renderElement } from "./utils/render.js";
import { getPoints } from "./view/get-points.js";
import { renderPointItem } from "./utils/render.js";
import PointEditorView from "./view/point-editor.js"
import PointView from "./view/point-item.js";


const COUNT_POINT = 10;
const pageBodyMain = document.querySelector('.page-body__page-main');
const tripEventsMain = pageBodyMain.querySelector('.trip-events');


const points = getPoints(COUNT_POINT);

// console.log(points)

const renderSite = () => {
    //главное инфо
    const tripMain = document.querySelector('.trip-main');
    renderElement(tripMain, new InfoView(points), RenderPosition.AFTERBEGIN);

    //навигация
    const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
    renderElement(tripControlsNavigation, new NavigationView(), RenderPosition.BEFOREEND);

    //фильтры
    const tripControlsFilters = document.querySelector('.trip-controls__filters');
    renderElement(tripControlsFilters, new FiltersView(), RenderPosition.BEFOREEND);

    //сортировка
    renderElement(tripEventsMain, new SortView(), RenderPosition.BEFOREEND);

    const isEmpty = points.length === 0 ? true : false;

    if (!isEmpty) {
        points.forEach((element) => {
          const pointView = new PointView(element);
          const pointViewEditor = new PointEditorView(element);

          renderPointItem(tripEventsMain, pointView, pointViewEditor);
        })
    }
    //формы
    if (isEmpty) {
        //нет данных
        renderElement(tripEventsMain, new ListEmptyView(isEmpty), RenderPosition.BEFOREEND);

        //загрузка
        // renderElement(tripEventsMain, new LoadingView(false), RenderPosition.BEFOREEND);
    }
}


renderSite();
