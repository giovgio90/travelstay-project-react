import { FETCH_STAY_REQUEST, FETCH_STAY_SUCCESS, FETCH_STAY_FAILURE } from "../actions";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const stayReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_STAY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_STAY_FAILURE:
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

export default stayReducer;
