const getRandomInteger = (a = 0, b = 1) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
    return Math.floor(lower + Math.random() * (upper - lower + 1));
}

//проверить нажата ли клавиша Escape или Esc
const isEscEvent = (evt) => {
    return evt.key === 'Escape' || evt.key === 'Esc';
}

// //сборка нового массива с заменой элемента
// const updateItem = (items, update) => {
//     const index = items.findIndex((item) => item.id === update.id);

//     if (index === -1) {
//         return items;
//     }

//     return [
//         ...items.slice(0, index),
//         update,
//         ...items.slice(index + 1),
//     ];
// }


const comparePrice = (elementA, elementB) => {
    const rankA = +elementA.basePrice;
    const rankB = +elementB.basePrice;
    return rankB - rankA;
};

const compareDataFrom = (elementA, elementB) => {
    const rankA = elementA.dateFrom;
    const rankB = elementB.dateFrom;
    return rankA - rankB;
};

const compareTime = (elementA, elementB) => {
    const rankA = +elementA.pointDuration.replace(/[H,D,M, ]/g, '');
    const rankB = +elementB.pointDuration.replace(/[H,D,M, ]/g, '');
    return rankB - rankA;
};

const getSortPricePoints = (points) => {
    const sortPoints = points.slice().sort(comparePrice);
    return sortPoints;
}

const getSortDayPoints = (points) => {
    const sortPoints = points.slice().sort(compareDataFrom);
    return sortPoints;
}

const getSortTimePoints = (points) => {
    const sortPoints = points.slice().sort(compareTime);
    return sortPoints;
}

export { getRandomInteger, isEscEvent, getSortPricePoints, getSortTimePoints, getSortDayPoints }
