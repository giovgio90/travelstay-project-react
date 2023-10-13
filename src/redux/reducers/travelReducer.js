import {
  FETCH_TRAVEL_REQUEST,
  FETCH_TRAVEL_SUCCESS,
  FETCH_TRAVEL_FAILURE,
  UPDATE_TRAVEL_REQUEST,
  UPDATE_TRAVEL_SUCCESS,
  UPDATE_TRAVEL_FAILURE,
} from "../actions";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const travelReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRAVEL_REQUEST:
    case UPDATE_TRAVEL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TRAVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_TRAVEL_SUCCESS:
      // Aggiorna le offerte di viaggio con i nuovi dati
      const updatedTravelData = state.data.map((offer) => {
        if (offer.id === action.payload.id) {
          return action.payload;
        }
        return offer;
      });
      return {
        ...state,
        loading: false,
        data: updatedTravelData,
        error: null,
      };
    case FETCH_TRAVEL_FAILURE:
    case UPDATE_TRAVEL_FAILURE:
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
