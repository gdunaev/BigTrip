import { InfoView } from "./view/info.js";
import { NavigationView } from "./view/navigation.js";
import { FiltersView } from "./view/filters.js";
import { SortView } from "./view/sort.js";
import { PointEditView } from "./view/point-edit.js"
import { PointView } from "./view/point-item.js";
import { ListEmptyView } from "./view/list-empty.js";
import { LoadingView } from "./view/loading.js";
import { createStatsTemplate } from "./view/stats.js";
import { createPoint } from "./view/mock.js";
import { getPastPoints } from "./view/dayjs.js";
import { getFuturePoints } from "./view/dayjs.js";
import { renderTemplate, RenderPosition, renderElement, isEscEvent } from "./view/util.js";


const COUNT_POINT = 10;
const pageBodyMain = document.querySelector('.page-body__page-main');
const tripEventsMain = pageBodyMain.querySelector('.trip-events');


//получение данных
const getPoints = () => {
    const compareDataFrom = (elementA, elementB) => {
        const rankA = elementA.dateFrom;
        const rankB = elementB.dateFrom;
        return rankA - rankB;
    };
    return new Array(COUNT_POINT).fill().map(createPoint).sort(compareDataFrom);
}

const points = getPoints();


const getBodySite = () => {
    //главное инфо
    const tripMain = document.querySelector('.trip-main');
    renderElement(tripMain, new InfoView(points).getElement(), RenderPosition.AFTERBEGIN);


    //навигация
    const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
    renderElement(tripControlsNavigation, new NavigationView().getElement(), RenderPosition.BEFOREEND);


    //фильтры
    const tripControlsFilters = document.querySelector('.trip-controls__filters');
    renderElement(tripControlsFilters, new FiltersView().getElement(), RenderPosition.BEFOREEND);


    //сортировка
    renderElement(tripEventsMain, new SortView().getElement(), RenderPosition.BEFOREEND);


    const isEmpty = points.length === 0 ? true : false;

    if (!isEmpty) {
        points.forEach((element) => {
          renderPointItem(element);
        })
    }
    //формы
    if (isEmpty) {
        //нет данных
        renderElement(tripEventsMain, new ListEmptyView(isEmpty).getElement(), RenderPosition.BEFOREEND);

        //загрузка
        // renderElement(tripEventsMain, new LoadingView(false).getElement(), RenderPosition.BEFOREEND);
    }
}

const renderPointItem = (element) => {

  const pointView = new PointView(element);
  const pointViewEdit = new PointEditView(element);

  const replaceItemToForm = () =>{
    tripEventsMain.replaceChild(pointViewEdit.getElement(), pointView.getElement());
  }
  const replaceFormToItem = () =>{
    tripEventsMain.replaceChild(pointView.getElement(), pointViewEdit.getElement());
  }

  const onEscPressDown = (evt) =>{
    if (isEscEvent(evt)) {
      evt.preventDefault();
      replaceFormToItem();
    }
  }

  pointView.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceItemToForm();
    document.addEventListener('keydown', onEscPressDown, {once: true});
  });
  pointViewEdit.getElement().querySelector('.event').addEventListener('submit', replaceFormToItem);
  pointViewEdit.getElement().querySelector('.event__reset-btn').addEventListener('click', replaceFormToItem);
  pointViewEdit.getElement().querySelector('.event__rollup-btn').addEventListener('click', replaceFormToItem);

  renderElement(tripEventsMain, pointView.getElement(), RenderPosition.BEFOREEND);
}

getBodySite();
