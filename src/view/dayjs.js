import dayjs from 'dayjs';
import { getRandomInteger } from "../utils/common.js";

const minMax = require('dayjs/plugin/minMax');
dayjs.extend(minMax);

const getStringDate = (partDate, symbol, isDay) => {
    if (partDate === 0) {
        return (isDay === true ? `00${symbol} ` : '');
    } else if (partDate < 10) {
        return `0${partDate}${symbol} `;
    } else if (partDate >= 10) {
        return `${partDate}${symbol} `;
    }
}

const getMinMaxDurationDate = (dateA = null, dateB = null) => {

  // console.log(dateA, dateB)

  let dates = [dateA, dateB];
  if (dateA === null) {
    dates = [getRandomDate(), getRandomDate()];
  }

    const minMaxDates = [];
    minMaxDates.push(dayjs.min(dates));
    minMaxDates.push(dayjs.max(dates));

    //получим разницу в миллисекундах, и разделим на дни/часы/минуты
    const durationMinuteAll = Math.trunc(minMaxDates[1].diff(minMaxDates[0]) / 60000);
    const durationMin = durationMinuteAll % 60;
    const durationHourAll = (durationMinuteAll - durationMin) / 60;
    const durationHour = durationHourAll % 24;
    const durationDay = (durationHourAll - durationHour) / 24;

    const isDay = durationDay === 0 ? false : true;

    let durationPoint = getStringDate(durationMin, 'M', false);
    durationPoint = getStringDate(durationHour, 'H', isDay) + durationPoint;
    durationPoint = getStringDate(durationDay, 'D', isDay) + durationPoint;

    //а потом эту дату запишем в массив
    minMaxDates.push(durationPoint);

    return minMaxDates;
}

//расчет продолжительности поездки строкой - 00D 00H 00M
const getMinMaxDateDuration = (dateMin, dateMax) => {

   const dateFrom = dayjs(dateMin);
   const dateTo = dayjs(dateMax);
  
      //получим разницу в миллисекундах, и разделим на дни/часы/минуты
      const durationMinuteAll = Math.trunc(dateTo.diff(dateFrom) / 60000);
      const durationMin = durationMinuteAll % 60;
      const durationHourAll = (durationMinuteAll - durationMin) / 60;
      const durationHour = durationHourAll % 24;
      const durationDay = (durationHourAll - durationHour) / 24;
  
      const isDay = durationDay === 0 ? false : true;
  
      let durationPoint = getStringDate(durationMin, 'M', false);
      durationPoint = getStringDate(durationHour, 'H', isDay) + durationPoint;

      return getStringDate(durationDay, 'D', isDay) + durationPoint;
  }
  

const getPointDurationMinute = (dateMin, dateMax) => {

      //получим разницу в миллисекундах, и посчитаем минуты
      return Math.trunc(dayjs(dateMax).diff(dayjs(dateMin)) / 60000);

  }

  //пребразуем кол-во минут в строку - 00D 00H 00M
  const getTypeDuration = (minute) => {

    const durationMin = minute % 60;
    const durationHourAll = (minute - durationMin) / 60;
    const durationHour = durationHourAll % 24;
    const durationDay = (durationHourAll - durationHour) / 24;
    const isDay = durationDay === 0 ? false : true;

    let durationPoint = getStringDate(durationMin, 'M', false);
    durationPoint = getStringDate(durationHour, 'H', isDay) + durationPoint;
    durationPoint = getStringDate(durationDay, 'D', isDay) + durationPoint;
    return durationPoint;
}


const getRandomDate = () => {
    return dayjs(dayjs().add(getRandomInteger(-4320, 4320), 'minute').toDate());
}

const getDateHour = (date) => {
    return dayjs(date).format('HH:mm');
}

const getMonthDay = (date) => {
    return dayjs(date).format('MMM DD');
}

const getOnlyDate = (date) => {
    return dayjs(date).format('YYYY-MM-DD');
}

const getDateHourMinute = (date) => {
    return dayjs(date).format('YYYY-MM-DDTHH:mm');
}

const getDateEdit = (date) => {
    return dayjs(date).format('DD/MM/YY HH:mm');
}

const getCumulativeDate = (dateMin, dateMax) => {

    const dateFrom = dayjs(dateMin);
    const dateTo = dayjs(dateMax);

    return dateFrom.format('MMM') === dateTo.format('MMM') ?
        `${dateFrom.format('MMM')} ${dateFrom.format('DD')}&nbsp;&mdash;&nbsp;${dateTo.format('DD')}` :
        `${dateFrom.format('MMM')} ${dateFrom.format('DD')}&nbsp;&mdash;&nbsp;${dateTo.format('MMM')} ${dateTo.format('DD')}`;

}

const getPastPoints = (points) => {
    const pastPoint = points.filter((currentPoint) => { return dayjs().isAfter(currentPoint.dateTo) });
    return pastPoint;
}

const getFuturePoints = (points) => {
    const futurePoint = points.filter((currentPoint) => { return dayjs().isBefore(currentPoint.dateFrom, 'D') || dayjs().isSame(currentPoint.dateFrom, 'D') });
    return futurePoint;
}


const setDatesFields = (state) => {

  if (state.dateFromPicker === null && state.dateToPicker === null) {
    return {}
  }

    // dateFrom: state.dateFromPicker !== null ? state.dateFromPicker : state.dateFrom,
    //     dateTo: state.dateToPicker !== null ? state.dateToPicker : state.dateTo,

    const dateFrom = state.dateFromPicker !== null ? dayjs(state.dateFromPicker) : state.dateFrom;
    const dateTo = state.dateToPicker !== null ? dayjs(state.dateToPicker) : state.dateTo;
    const dueDates = getMinMaxDurationDate(dateFrom, dateTo);
    // dateFrom = dueDates[0];
    // dateTo = dueDates[1];
    const pointDuration = dueDates[2];

// console.log(dateFrom,  dateTo,  pointDuration)

    // return {}
    return {
        'dateFrom': dateFrom,
        'dateFromOnlyDate': getOnlyDate(dateFrom),
        'dateFromMonthDay': getMonthDay(dateFrom),
        'dateFromHourMinute': getDateHourMinute(dateFrom),
        'dateFromHour': getDateHour(dateFrom),
        'dateFromEdit': getDateEdit(dateFrom),
        dateTo,
        'dateToHour': getDateHour(dateTo),
        'dateToHourMinute': getDateHourMinute(dateTo),
        'dateToEdit': getDateEdit(dateTo),
        pointDuration,
    };
  }

export {
    getDateHour,
    getMonthDay,
    getRandomDate,
    getMinMaxDurationDate,
    getOnlyDate,
    getDateHourMinute,
    getDateEdit,
    getCumulativeDate,
    getPastPoints,
    getFuturePoints,
    setDatesFields,
    getPointDurationMinute,
    getTypeDuration,
    getMinMaxDateDuration
}
