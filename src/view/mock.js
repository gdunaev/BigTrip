import { getDateHour } from "./dayjs";
import { getMonthDay } from "./dayjs";
import { getOnlyDate } from "./dayjs";
import { getRandomInteger } from "../utils/common.js";
import { getMinMaxDurationDate } from "./dayjs";
import { getDateHourMinute } from "./dayjs";
import { getDateEdit } from "./dayjs";
import { nanoid } from "nanoid";


const PATH_PHOTOS = 'http://picsum.photos/300/200?r=';
const TYPE_POINT = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const POINT_NAME = ['Питер', 'Москва', 'Кукуево', 'Рио', 'Париж', 'Ландон', 'Невада'];
const DESTINATION_INFORMATION = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra. ',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. ',
    'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
];


const OFFER = new Map([
    ["Taxi", [{ "title": "Послушать радио", "price": 120 }, { "title": "Попить водички", "price": 60 }]],
    ["Bus", [{ "title": "Место у окна", "price": 50 }]],
    ["Train", [{ "title": "Второй этаж", "price": 40 }, { "title": "Еда", "price": 30 }]],
    ["Ship", [{ "title": "1 палуба", "price": 20 }, { "title": "выдадут спасжилет", "price": 25 }, { "title": "гидрокостюм", "price": 50 }]],
    ["Transport", [{ "title": "кондиционер", "price": 35 }, { "title": "без остановок", "price": 45 }]],
    ["Drive", [{ "title": "с водителем", "price": 55 }, { "title": "бизнес-класс", "price": 65 }]],
    ["Check-in", [{ "title": "онлайн", "price": 70 }, { "title": "предварительная", "price": 80 }]],
    ["Restaurant", [{ "title": "С музыкой", "price": 90 }, { "title": "места у окна", "price": 110 }]],
]);



const getRandomDescription = () => {
    const countString = getRandomInteger(1, 5);
    let destination = '';
    for (let i = 1; i <= countString; i++) {
        destination = DESTINATION_INFORMATION[getRandomInteger(0, DESTINATION_INFORMATION.length - 1)] + (destination !== '' ? " " + destination : destination);
    }

    return destination;
}

const getArrayPictures = () => {
    let array = [];
    const countPhoto = getRandomInteger(3, 5);
    for (let i = 1; i <= countPhoto; i++) {
        const picture = {
            '_number_photo': getRandomInteger(1, 200),
            get src() {
                return `${PATH_PHOTOS}${this._number_photo}`;
            },
            get description() {
                return `описание к фото №${this._number_photo}`;
            },
        }
        array.push(picture);
    }
    return array;
}


const POINT_DESCRIPTION = new Map([
    ['Питер', [{ 'description': getRandomDescription(), 'pictures': getArrayPictures() }]],
    ['Москва', [{ 'description': getRandomDescription(), 'pictures': getArrayPictures() }]],
    ['Кукуево', [{ 'description': getRandomDescription(), 'pictures': getArrayPictures() }]],
    ['Рио', [{ 'description': getRandomDescription(), 'pictures': getArrayPictures() }]],
    ['Париж', [{ 'description': getRandomDescription(), 'pictures': getArrayPictures() }]],
    ['Ландон', [{ 'description': getRandomDescription(), 'pictures': getArrayPictures() }]],
    ['Невада', [{ 'description': getRandomDescription(), 'pictures': getArrayPictures() }]],
    ['Питер', [{ 'description': getRandomDescription(), 'pictures': getArrayPictures() }]],
]);



const createPoint = () => {

    const name = POINT_NAME[getRandomInteger(0, POINT_NAME.length - 1)];
    const typePoint = TYPE_POINT[getRandomInteger(0, TYPE_POINT.length - 1)];

    const dueDates = getMinMaxDurationDate();
    const dateFrom = dueDates[0];
    const dateTo = dueDates[1];
    const pointDuration = dueDates[2];

    return {
        id: nanoid(),
        typePoint,
        name,
        'basePrice': getRandomInteger(10, 200),
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
        'destination': POINT_DESCRIPTION.get(name),
        'isFavorite': Boolean(getRandomInteger(0, 1)),
        'offers': OFFER.get(typePoint),
    };
}

export { createPoint };
