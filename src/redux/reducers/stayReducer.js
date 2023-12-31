import {
  FETCH_STAY_REQUEST,
  FETCH_STAY_SUCCESS,
  FETCH_STAY_FAILURE,
  UPDATE_STAY_REQUEST,
  UPDATE_STAY_SUCCESS,
  UPDATE_STAY_FAILURE,
  ADD_REVIEW_SUCCESS,
  DELETE_STAY_OFFER,
  ADD_STAY_OFFER_SUCCESS,
  TOGGLE_STAY_FAVORITE,
} from "../actions";

const initialState = {
  loading: false,
  data: [],
  error: null,
  reviews: [],
  favorites: [],
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
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [...state.reviews, action.payload.review],
      };
    case ADD_STAY_OFFER_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case DELETE_STAY_OFFER:
      const updatedStayDataAfterDeletion = state.data.filter((offer) => offer.id !== action.payload);
      return {
        ...state,
        data: updatedStayDataAfterDeletion,
      };
    case TOGGLE_STAY_FAVORITE:
      const offerId = action.payload;
      if (state.favorites.includes(offerId)) {
        const updatedFavorites = state.favorites.filter((id) => id !== offerId);
        console.log(`Offerta soggiorno con ID ${offerId} rimossa dai preferiti`);
        return {
          ...state,
          favorites: updatedFavorites,
        };
      } else {
        console.log(`Offerta soggiorno con ID ${offerId} aggiunta ai preferiti`);
        return {
          ...state,
          favorites: [...state.favorites, offerId],
        };
      }
    default:
      return state;
  }
};

export default stayReducer;
