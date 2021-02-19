import { combineReducers } from 'redux';
import spotsReducer from './spots';
import cityReducer from './cities';

export default combineReducers({
  spots: spotsReducer,
  cities: cityReducer
});