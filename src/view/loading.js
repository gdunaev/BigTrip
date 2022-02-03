export const createLoadingTemplate = (isLoading) => {

    if (isLoading) {
        return `<p class="trip-events__msg">Loading...</p>`;
    }
    return '';

};
