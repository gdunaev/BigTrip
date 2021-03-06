import PointModel from './model/points-model.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getAll() {
    return Promise
      .all([
        this.getPoints(),
        this.getDestinations(),
        this.getOffers(),
      ])
    .then((value) => value);
  }

  getPoints() {
    return this._load({url: 'points'})
      .then(Api.toJSON)
      .then((points) => points.map(PointModel.adaptToClient));;
  }

  getDestinations() {
    return this._load({url: 'destinations'})
      .then(Api.toJSON)
      .then((destinations) => destinations);;
  }

  getOffers() {
    return this._load({url: 'offers'})
      .then(Api.toJSON)
      .then((offers) => offers);;
  }

  updatePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointModel.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(PointModel.adaptToClient);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
