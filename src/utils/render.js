import { AbstractView } from "../view/abstract.js";
// import { isEscEvent } from "./common.js";
import { RenderPosition } from "../view/const.js";


const createElementDom = (template) => {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstElementChild;
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

  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
  console.log('66', component, component.getElement())
}

const render = (container, element, place) => {
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
        case RenderPosition.AFTEREND:
            container.insertAdjacentElement('afterEnd', element);
            break;
    }
}

export { createElementDom, remove, render, replace }
