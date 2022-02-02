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


const OFFER = [{
        "type": "taxi",
        "offers": [{ "title": "Послушать радио", "price": 120 }, { "title": "Попить водички", "price": 60 }]
    },
    {
        "type": "bus",
        "offers": [{ "title": "Место у окна", "price": 50 }]
    },
    {
        "type": "train",
        "offers": [{ "title": "Второй этаж", "price": 40 }, { "title": "Еда", "price": 30 }]
    },
    {
        "type": "ship",
        "offers": [{ "title": "1 палуба", "price": 20 }, { "title": "выдадут спасжилет", "price": 25 }, { "title": "гидрокостюм", "price": 50 }]
    },
    {
        "type": "transport",
        "offers": [{ "title": "кондиционер", "price": 35 }, { "title": "без остановок", "price": 45 }]
    },
    {
        "type": "drive",
        "offers": [{ "title": "с водителем", "price": 55 }, { "title": "бизнес-класс", "price": 65 }]
    },
    {
        "type": "check-in",
        "offers": [{ "title": "онлайн", "price": 70 }, { "title": "предварительная", "price": 80 }]
    },
    //sightseeing - не будет
    {
        "type": "restaurant",
        "offers": [{ "title": "С музыкой", "price": 90 }, { "title": "места у окна", "price": 110 }]
    },
];




const getRandomInteger = (a = 0, b = 1) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.min(a, b));

    return Math.floor(lower + Math.random() * (upper - lower + 1));
}


const getRandomDescription = () => {
    const countString = getRandomInteger(1, 5);
    let destination = '';
    for (let i = 1; i <= countString; i++) {
        destination = DESTINATION_INFORMATION[0, DESTINATION_INFORMATION.length - 1] + destination !== '' ? " " : "" + destination;
    }
    return destination;
}

const getArrayPictures = () => {
    let array = [];
    const countPhoto = getRandomInteger(3, 5);
    for (let i = 1; i <= countPhoto; i++) {
        console.log(countPhoto)
        array.push({
            'number_photo': getRandomInteger(1, 200),
            'src': `http://picsum.photos/300/200?r=${this.number_photo}`,
            'description': `описание к фото №${this.number_photo}`
        });
    }
    return array;
}

const POINT_DESCRIPTION = [{
        'description': getRandomDescription(),
        'name': 'Питер',
        'pictures': getArrayPictures()
    },
    {
        'description': getRandomDescription(),
        'name': 'Москва',
        'pictures': getArrayPictures()
    },
    {
        'description': getRandomDescription(),
        'name': 'Кукуево',
        'pictures': getArrayPictures()
    },
    {
        'description': getRandomDescription(),
        'name': 'Рио',
        'pictures': getArrayPictures()
    },
    {
        'description': getRandomDescription(),
        'name': 'Париж',
        'pictures': getArrayPictures()
    },
    {
        'description': getRandomDescription(),
        'name': 'Ландон',
        'pictures': getArrayPictures()
    },
    {
        'description': getRandomDescription(),
        'name': 'Невада',
        'pictures': getArrayPictures()
    }
];



const getDestination = (point) => {
    for (elem of POINT_DESCRIPTION) {
        if (elem.name === point) {
            return elem;
        }
    }
}



const getOffers = (type_point) => {
    for (elem of OFFER) {
        if (elem.type_point === type_point) {
            return elem.offers;
        }
    }
}


const createPoint = () => {
    return {
        'type_point': TYPE_POINT[getRandomInteger(0, TYPE_POINT.length - 1)],
        'point': POINT_NAME[getRandomInteger(0, POINT_NAME.length - 1)],
        'base_price': 222,
        'date_from': "2019-07-10T22:55:56.845Z",
        'date_to': "2019-07-11T11:22:13.375Z",
        'destination': getDestination(this.point),
        'is_favorite': Boolean(getRandomInteger(0, 1)),
        'offers': getOffers(this.type_point),
    };
}

export { createPoint };
