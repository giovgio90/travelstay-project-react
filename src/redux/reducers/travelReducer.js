import { FETCH_TRAVEL_REQUEST, FETCH_TRAVEL_SUCCESS, FETCH_TRAVEL_FAILURE } from "../actions";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const travelReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRAVEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TRAVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_TRAVEL_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default travelReducer;
