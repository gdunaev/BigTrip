
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

//проверить нажата ли клавиша Escape или Esc
const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

//сборка нового массива с заменой элемента
const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
}

export { getRandomInteger, isEscEvent, updateItem }
