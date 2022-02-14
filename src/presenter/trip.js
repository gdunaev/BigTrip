import ListEmptyView from "../view/list-empty.js";
// import { renderPointItem } from "../utils/render.js";
import PointEditorView from "../view/point-editor.js"
import PointView from "../view/point-item.js";
import { RenderPosition } from "../utils/render.js";
import { isEscEvent } from "../utils/common.js";
import { AbstractView } from "../view/abstract.js";


export default class Trip {
    constructor(points, tripEventsMain) {
        this._points = points;
        this._isEmpty = points.length === 0 ? true : false;
        this._listEmptyView = new ListEmptyView(this._isEmpty);
        this._tripEventsMain = tripEventsMain;
    }

    start() {
        if (this._isEmpty) {
            this.render(this._tripEventsMain, this._listEmptyView, RenderPosition.BEFOREEND);
            return;
        }
        this._renderPoints();
    }

    _renderPoint(pointView, pointViewEditor) {
        const replaceItemToForm = () => {
            replace(pointViewEditor, pointView);
        }
        const replaceFormToItem = () => {
            replace(pointView, pointViewEditor);
        }

        const onEscPressDown = (evt) => {
            if (isEscEvent(evt)) {
                evt.preventDefault();
                replaceFormToItem();
            }
        }
        pointView.getRollupClickHandler(() => {
            replaceItemToForm();
            document.addEventListener('keydown', onEscPressDown, { once: true });
        });
        pointViewEditor.getSubmitFormHandler(replaceFormToItem);
        pointViewEditor.getResetClickHandler(replaceFormToItem);
        pointViewEditor.getRollupClickHandler(replaceFormToItem);

        this.render(this._tripEventsMain, pointView, RenderPosition.BEFOREEND);
    }

    _renderPoints() {
        this._points.forEach((element) => {
            const pointView = new PointView(element);
            const pointViewEditor = new PointEditorView(element);
            this._renderPoint(pointView, pointViewEditor);
        })
    }

    render(container, element, place) {
        //проверка для DOM-элементов и компонентов, у DOM вызываем getElement
        if (container instanceof AbstractView) {
            container = container.getElement();
        }
        if (element instanceof AbstractView) {
            element = element.getElement();
        }
        switch (place) {
            case RenderPosition.AFTERBEGIN:
                container.prepend(element);
                break;
            case RenderPosition.BEFOREEND:
                container.append(element);
                break;
        }
    }

    _replace(newChild, oldChild) {
        if (newChild instanceof AbstractView) {
            newChild = newChild.getElement();
        }
        if (oldChild instanceof AbstractView) {
            oldChild = oldChild.getElement();
        }
        const parent = oldChild.parentElement;

        if (parent === null || oldChild === null || newChild === null) {
            throw new Error('Can\`t replace unexisting elements');
        }

        parent.replaceChild(newChild, oldChild);
    }
}
