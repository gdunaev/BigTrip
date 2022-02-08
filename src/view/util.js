const RenderPosition = {
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
};


const getRandomInteger = (a = 0, b = 1) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
    return Math.floor(lower + Math.random() * (upper - lower + 1));
}

const createElementDom = (template) => {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstElementChild;
}

const renderElement = (container, element, place) => {
    switch (place) {
        case RenderPosition.AFTERBEGIN:
            container.prepend(element);
            break;

        case RenderPosition.BEFOREEND:
            container.append(element);
            break;
    }
}

//проверить нажата ли клавиша Escape или Esc
const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

export { getRandomInteger, createElementDom, renderElement, RenderPosition, isEscEvent }
