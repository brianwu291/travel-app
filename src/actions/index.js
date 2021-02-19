export const GET_SPOTS_REQUEST = 'GET_SPOTS_REQUEST';
export function getSpotsRequest({
  totalNumber = 30,
  skipNumber = 0,
}) {
  return ({
    type: GET_SPOTS_REQUEST,
    payload: {
      totalNumber,
      skipNumber,
    }
  })
}
export const GET_SPOTS_SUCCESS = 'GET_SPOTS_SUCCESS';
export function getSpotsSuccess({
  spots = [],
  totalNumber = 30,
  skipNumber = 0,
}) {
  return ({
    type: GET_SPOTS_SUCCESS,
    payload: {
      spots,
      totalNumber,
      skipNumber,
    }
  });
}

export const GET_CITY_REQUEST = 'GET_CITY_REQUEST';
export function getCityRequest({
  totalNumber = 30,
  skipNumber = 0,
  cityName = ''
}) {
  return ({
    type: GET_CITY_REQUEST,
    payload: {
      totalNumber,
      skipNumber,
      cityName,
    }
  })
}
export const GET_CITY_SUCCESS = 'GET_CITY_SUCCESS';

export function getCitySuccess({
  cityName = '',
  citySpots = [],
  totalNumber = 30,
  skipNumber = 0,
}) {
  return ({
    type: GET_CITY_SUCCESS,
    payload: {
      cityName,
      citySpots,
      totalNumber,
      skipNumber,
    }
  });
}
