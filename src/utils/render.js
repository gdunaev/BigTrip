
import {AbstractView} from "../view/abstract.js";
import { isEscEvent } from "./common.js";

const RenderPosition = {
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
};

const createElementDom = (template) => {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstElementChild;
}

const renderElement = (container, element, place) => {

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

const replace = (newChild, oldChild) => {

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

const remove = (component) => {

  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }
  component.getElement().remove();
  component.removeElement();
}

const renderPointItem = (...rest) => {

  const [tripEventsMain, pointView, pointViewEditor] = rest;

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

export { createElementDom, RenderPosition, remove, replace, renderElement, renderPointItem}
