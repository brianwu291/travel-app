import get from 'lodash/get';
import { COUNTS_PER_PAGE } from '../../constants';
import {
  GET_SPOTS_REQUEST,
  GET_SPOTS_SUCCESS,
} from '../../actions';

const initialState = {
  spots: [],
  currentPage: 0,
  isFetching: false,
  isFetchingDone: false,
};

function spotsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SPOTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_SPOTS_SUCCESS: {
      const newSpots = [...state.spots];
      const returnSpots = get(action, 'payload.spots', []);
      const isLastPage = returnSpots?.length === 0;
      const skipNumber = get(action, 'payload.skipNumber', 0);
      const newCurrentPage = Math.floor(skipNumber / COUNTS_PER_PAGE);
      return ({
        isFetching: false,
        isFetchingDone: isLastPage,
        spots: newSpots.concat(returnSpots),
        currentPage: isLastPage ? state.currentPage : newCurrentPage,

      })
    }      
    default:
      return state;
  }
}

export default spotsReducer
