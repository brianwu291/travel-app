import { all } from 'redux-saga/effects';
import watchGetSpotsSaga from './watchers/getSpots';
import watchGetCitySaga from './watchers/getCity';

export default function* root() {
  yield all([
    watchGetSpotsSaga(),
    watchGetCitySaga(),
  ]);
}