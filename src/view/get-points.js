import { createPoint } from "../view/mock.js";


//получение данных
const getPoints = (countPoint) => {
  const compareDataFrom = (elementA, elementB) => {
      const rankA = elementA.dateFrom;
      const rankB = elementB.dateFrom;
      return rankA - rankB;
  };
  return new Array(countPoint).fill().map(createPoint).sort(compareDataFrom);
}

export {getPoints}
