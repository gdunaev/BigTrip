import Observer from '../utils/observer.js';
import {UpdateType}from '../const.js';

const OFFER = new Map([]);
const POINT_DESCRIPTION = new Map([]);
const POINT_NAME = [];


export default class PointsModel extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice(); //тестовая строка 1. this._points = points.slice(0, 3); и 2. []

    if (UpdateType.INIT === updateType) {
      this._points = this._parseData(this._points);
    }
    // console.log('333', this._points)

    //здесь вызываются два обзервера:
    //1. установлен в FilterPresenter (вызывает init у фильтров)
    //2. установленный в TripPresenter (вызывает _renderPoints)
    this._notify(updateType);
  }

  _parseData(points) {
    points.forEach((point) => {
       OFFER.set(point.typePoint, point.offers);
       POINT_DESCRIPTION.set(point.destination.name, point.destination);
       if(!POINT_NAME.includes(point.destination.name)) {
        POINT_NAME.push(point.destination.name);
       };
      //  point.offers.forEach((offer) => {
      //   offer.included = false; //добавим по умолчанию что все офферы не выбраны
      //  });
    });

        // console.log(OFFER)
    return points;
  }

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
        offers: point.offers.slice(),
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

    // console.log(adaptedPoint)

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

export {OFFER, POINT_DESCRIPTION, POINT_NAME}


