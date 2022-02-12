import InfoView from "./view/info.js";
import NavigationView from "./view/navigation.js";
import FiltersView  from "./view/filters.js";
import SortView from "./view/sort.js";
import PointEditorView from "./view/point-editor.js"
import PointView from "./view/point-item.js";
import ListEmptyView  from "./view/list-empty.js";
// import LoadingView from "./view/loading.js";
// import { createStatsTemplate } from "./view/stats.js";
import { createPoint } from "./view/mock.js";
// import { getPastPoints } from "./view/dayjs.js";
// import { getFuturePoints } from "./view/dayjs.js";
import { RenderPosition, renderElement, replace } from "./utils/render.js";
import { isEscEvent } from "./utils/common.js";
import { getPoints } from "./view/get-points.js";


const COUNT_POINT = 10;
const pageBodyMain = document.querySelector('.page-body__page-main');
const tripEventsMain = pageBodyMain.querySelector('.trip-events');


const points = getPoints(COUNT_POINT);


const getBodySite = () => {
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
          renderPointItem(element);
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

const renderPointItem = (element) => {

  const pointView = new PointView(element);
  const pointViewEditor = new PointEditorView(element);

  const replaceItemToForm = () =>{
    replace(pointViewEditor, pointView);
  }
  const replaceFormToItem = () =>{
    replace(pointView, pointViewEditor);
  }

  const onEscPressDown = (evt) =>{
    if (isEscEvent(evt)) {
      evt.preventDefault();
      replaceFormToItem();
    }
  }

  pointView.getRollupClickHandler(() => {
    replaceItemToForm();
    document.addEventListener('keydown', onEscPressDown, {once: true});
  });
  pointViewEditor.getSubmitFormHandler(replaceFormToItem);
  pointViewEditor.getResetClickHandler(replaceFormToItem);
  pointViewEditor.getRollupClickHandler(replaceFormToItem);

  renderElement(tripEventsMain, pointView, RenderPosition.BEFOREEND);
}

getBodySite();
