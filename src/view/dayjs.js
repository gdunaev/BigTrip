import dayjs from 'dayjs';
import { getRandomInteger } from "./util";

const minMax = require('dayjs/plugin/minMax');
dayjs.extend(minMax);

const getMinMaxDurationDate = (array) => {
    const minMaxDates = [];
    minMaxDates.push(dayjs.min(array));
    minMaxDates.push(dayjs.max(array));

    //получим разницу в миллисекундах и преобразуем ее в дату
    const durationDate = dayjs(minMaxDates[1].diff(minMaxDates[0]));

    //а потом эту дату запишем в массив с форматированием
    minMaxDates.push(durationDate.format('DD') === '00' ? '' : durationDate.format('DD[D]'));
    minMaxDates.push(durationDate.format('HH') === '00' ? '' : durationDate.format('HH[H]'));
    minMaxDates.push(durationDate.format('mm[M]'));

    return minMaxDates;
}

const getRandomDate = () => {
    return dayjs(dayjs().add(getRandomInteger(60, 3000), 'minute').toDate());
}

const getDateHour = (date) => {
    return date.format('HH:mm');
}

const getDateMonth = (date) => {
    return date.format('MMM DD');
}

export { getDateHour, getDateMonth, getRandomDate, getMinMaxDurationDate }
