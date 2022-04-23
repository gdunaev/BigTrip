import Observer from '../utils/observer.js';
import {UpdateType}from '../const.js';

// const OFFER = new Map([]);
// const POINT_DESCRIPTION = new Map([]);
// const POINT_NAME = [];


export default class PointsModel extends Observer {
  constructor() {
    super();
    this._points = [];
    this._offers = [];
    this._destinations = [];
  }

  setPoints(updateType, value) {
    this._points = value[0]; //тестовая строка 1.
    this._destinations = value[1];
    this._offers = value[2];

    // if (UpdateType.INIT === updateType) {
    //   this._points = this._parseData(this._points);
    // }
      // console.log('000', this._offers)

    //здесь вызываются два обзервера:
    //1. установлен в FilterPresenter (вызывает init у фильтров)
    //2. установленный в TripPresenter (вызывает _renderPoints)
    this._notify(updateType);
  }

  getOffersAll() {
    // console.log('111', this._offers)
    return this._offers;
  }

  getOffers(type) {
    //  console.log('000', this._offers)
    return  this._offers.find((offer) => {
      // console.log('111', offer)
      offer.type === type;
    });
  }

  getDestinationsAll() {
    return  this._destinations;
  }

  _setOffers(typePoint, offers) {
    // const currentOffers = this._offers;
    // if(!currentOffers) {
    //   OFFER.set(typePoint, offers);
    //   return;
    // }
    // offers.forEach(offer => {
    //   const title = offer.title;
    //   let adding = true;
    //   for (let current of currentOffers) {
    //     if(current.title === title) {
    //       adding = false;
    //       break;
    //     }
    //   }
    //   adding === true ? currentOffers.push(offer) : '';
    // })
// console.log('1111', OFFER)
  }

  // _parseData(offers) {
  //   offers.forEach((offer) => {
  //     offer.included = true;
  //   });
  //   return offers;
  // }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    // console.log('11', update)
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];
    // console.log('22', this._notify)
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    let adaptedPoint = Object.assign(
      {},
      point,
      {
        typePoint: point.type,
        dateFrom: point.date_from,
        basePrice: point.base_price,
        dateTo: point.date_to,
        isFavorite: point.is_favorite,
        offers: point.offers,
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint.type;
    delete adaptedPoint.date_from;
    delete adaptedPoint.base_price;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;

    adaptedPoint.offers.forEach(element => {
      element.included = true;
    });

    //  console.log(adaptedPoint)

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        'due_date': point.dueDate instanceof Date ? point.dueDate.toISOString() : null, // На сервере дата хранится в ISO формате
        'is_archived': point.isArchive,
        'is_favorite': point.isFavorite,
        'repeating_days': point.repeating,
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint.dueDate;
    delete adaptedPoint.isArchive;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.repeating;

    return adaptedPoint;
  }
}

// export {OFFER, POINT_DESCRIPTION, POINT_NAME}


