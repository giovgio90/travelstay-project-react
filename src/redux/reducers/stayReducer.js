import {
  FETCH_STAY_REQUEST,
  FETCH_STAY_SUCCESS,
  FETCH_STAY_FAILURE,
  UPDATE_STAY_REQUEST,
  UPDATE_STAY_SUCCESS,
  UPDATE_STAY_FAILURE,
} from "../actions";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const stayReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STAY_REQUEST:
    case UPDATE_STAY_REQUEST:
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
    case UPDATE_STAY_SUCCESS:
      // Aggiorna le offerte di viaggio con i nuovi dati
      const updatedStayData = state.data.map((offer) => {
        if (offer.id === action.payload.id) {
          return action.payload;
        }
        return offer;
      });
      return {
        ...state,
        loading: false,
        data: updatedStayData,
        error: null,
      };
    case FETCH_STAY_FAILURE:
    case UPDATE_STAY_FAILURE:
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
