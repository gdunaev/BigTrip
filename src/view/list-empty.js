export const createListEmptyTemplate = (isEmpty) => {
    if (isEmpty) {
        return ` <p class="trip-events__msg">Click New Event to create your first point</p>`;
    }
    return '';
};
