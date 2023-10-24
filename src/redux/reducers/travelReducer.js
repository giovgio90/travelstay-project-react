import {
  FETCH_TRAVEL_REQUEST,
  FETCH_TRAVEL_SUCCESS,
  FETCH_TRAVEL_FAILURE,
  UPDATE_TRAVEL_REQUEST,
  UPDATE_TRAVEL_SUCCESS,
  UPDATE_TRAVEL_FAILURE,
  ADD_REVIEW_SUCCESS,
  CREATE_TRAVEL_OFFER,
  DELETE_TRAVEL_OFFER,
  TOGGLE_TRAVEL_FAVORITE,
} from "../actions";

const initialState = {
  loading: false,
  data: [],
  error: null,
  reviews: [],
  favorites: [],
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
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [...state.reviews, action.payload.review],
      };
    case CREATE_TRAVEL_OFFER:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case DELETE_TRAVEL_OFFER:
      const updatedTravelDataAfterDeletion = state.data.filter((offer) => offer.id !== action.payload);
      return {
        ...state,
        data: updatedTravelDataAfterDeletion,
      };
    case TOGGLE_TRAVEL_FAVORITE:
      const offerId = action.payload;
      if (state.favorites.includes(offerId)) {
        const updatedFavorites = state.favorites.filter((id) => id !== offerId);
        console.log(`Offerta viaggio con ID ${offerId} rimossa dai preferiti`);
        return {
          ...state,
          favorites: updatedFavorites,
        };
      } else {
        console.log(`Offerta viaggio con ID ${offerId} aggiunta ai preferiti`);
        return {
          ...state,
          favorites: [...state.favorites, offerId],
        };
      }

    default:
      return state;
  }
};

export default travelReducer;
