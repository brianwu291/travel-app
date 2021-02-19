import get from 'lodash/get';
import { COUNTS_PER_PAGE, CITY_NAME_MAPS } from '../../constants';
import {
  GET_CITY_REQUEST,
  GET_CITY_SUCCESS,
} from '../../actions';

const initialState = Object.keys(CITY_NAME_MAPS)
  .reduce((acc, cityChineseName) => {
    const cityName = CITY_NAME_MAPS[cityChineseName]
    const newRes = { ...acc };
    newRes[cityName] = {
      citySpots: [],
      currentPage: 0,
      isFetching: false,
      isFetchingDone: false,
    }
    return newRes;
  }, {});

function cityReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CITY_REQUEST: {
      const { cityName } = action?.payload || {};
      const preCityData = state[cityName] || {};
      return {
        ...state,
        [cityName]: {
          ...preCityData,
          isFetching: true,
        }
      };
    }
    case GET_CITY_SUCCESS: {
      const {
        cityName,
        citySpots,
        skipNumber,
      } = action?.payload || {};;
      const preCityData = state[cityName] || {};
      const isLastPage = citySpots?.length === 0;
      const newCurrentPage = Math.floor(skipNumber / COUNTS_PER_PAGE);
      return ({
        ...state,
        [cityName]: {
          ...preCityData,
          citySpots: get(preCityData, 'citySpots', []).concat(citySpots),
          currentPage: isLastPage ? preCityData.currentPage : newCurrentPage,
          isFetching: false,
          isFetchingDone: isLastPage,
        }
      })
    }      
    default:
      return state;
  }
}

export default cityReducer
