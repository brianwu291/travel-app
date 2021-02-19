import { put, takeEvery, call } from 'redux-saga/effects';
import get from 'lodash/get';
import {
  getSpotsSuccess,
  GET_SPOTS_REQUEST,
} from '../../actions';
import {
  getSpotsRequest
} from '../../api/spots';

function* getSpotsSaga(action) {
  const {
    totalNumber,
    skipNumber,
  } = get(action, 'payload', {});
  const { spots, newTotal, newSkip } = yield call(getSpotsRequest, {
    totalNumber,
    skipNumber,
  });
  yield put(getSpotsSuccess({
    spots,
    totalNumber: newTotal,
    skipNumber: newSkip,
  }));
}

export default function* watchGetSpotsSaga() {
  yield takeEvery(GET_SPOTS_REQUEST, getSpotsSaga);
}