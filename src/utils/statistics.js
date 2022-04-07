const getSumAndTypes = (points) => {
  
    //отбор в отдельный объект с суммированием цен по типу точки
    const sum = {};
    points.filter(({ typePoint, basePrice }) => {
      (sum[typePoint]) ? sum[typePoint] = sum[typePoint] + basePrice : sum[typePoint] = basePrice;
    });
  
    //сортировка по убыванию и создание объекта с готовыми для диаграммы массивами
    const sumTypesPoint = {
      types: [],
      sum: [],
    };
    Object.entries(sum).sort((a, b) => { return b[1] - a[1] }).forEach(elem => {
      sumTypesPoint.types.push(elem[0]);
      sumTypesPoint.sum.push(elem[1]);
    });
  
    return sumTypesPoint;
  };

  export {getSumAndTypes}