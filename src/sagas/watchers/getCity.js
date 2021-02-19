import { put, takeEvery, call } from 'redux-saga/effects';
import get from 'lodash/get';
import {
  getCitySuccess,
  GET_CITY_REQUEST,
} from '../../actions';
import { getCityRequest } from '../../api/city';

function* getCitySaga(action) {
  const {
    cityName,
    totalNumber,
    skipNumber,
  } = get(action, 'payload', {});
  const { citySpots, newTotal, newSkip } = yield call(getCityRequest, {
    cityName,
    totalNumber,
    skipNumber,
  });
  yield put(getCitySuccess({
    cityName,
    citySpots,
    totalNumber: newTotal,
    skipNumber: newSkip,
  }));
}

export default function* watchGetCitySaga() {
  yield takeEvery(GET_CITY_REQUEST, getCitySaga);
}