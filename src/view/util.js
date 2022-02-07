const RenderPosition = {
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
};


const getRandomInteger = (a = 0, b = 1) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
    return Math.floor(lower + Math.random() * (upper - lower + 1));
}

const renderTemplate = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
}

const createElementDom = (template) => {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    console.log(newElement)
        // console.log(template)
    return newElement.firstChild;
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

export { getRandomInteger, renderTemplate, createElementDom, renderElement, RenderPosition }
