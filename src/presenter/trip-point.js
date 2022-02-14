import { RenderPosition, render } from "../utils/render";

export default class TripItem {
    constructor(tripEventsMain) {
        this._tripEventsMain = tripEventsMain;
    }

    start(pointView, pointViewEditor) {
        const replaceItemToForm = () => {
            this._replace(pointViewEditor, pointView);
        }
        const replaceFormToItem = () => {
            this._replace(pointView, pointViewEditor);
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
        pointView.getFavoriteButtonHandler();
        pointViewEditor.getSubmitFormHandler(replaceFormToItem);
        pointViewEditor.getResetClickHandler(replaceFormToItem);
        pointViewEditor.getRollupClickHandler(replaceFormToItem);

        render(this._tripEventsMain, pointView, RenderPosition.BEFOREEND);
    }
}
