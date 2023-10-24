export const FETCH_TRAVEL_REQUEST = "FETCH_TRAVEL_REQUEST";
export const FETCH_TRAVEL_SUCCESS = "FETCH_TRAVEL_SUCCESS";
export const FETCH_TRAVEL_FAILURE = "FETCH_TRAVEL_FAILURE";
export const UPDATE_TRAVEL_REQUEST = "UPDATE_TRAVEL_REQUEST";
export const UPDATE_TRAVEL_SUCCESS = "UPDATE_TRAVEL_SUCCESS";
export const UPDATE_TRAVEL_FAILURE = "UPDATE_TRAVEL_FAILURE";
export const CREATE_TRAVEL_OFFER = "CREATE_TRAVEL_OFFER";
export const DELETE_TRAVEL_OFFER = "DELETE_TRAVEL_OFFER";
export const TOGGLE_TRAVEL_FAVORITE = "TOGGLE_TRAVEL_FAVORITE";

export const FETCH_STAY_REQUEST = "FETCH_STAY_REQUEST";
export const FETCH_STAY_SUCCESS = "FETCH_STAY_SUCCESS";
export const FETCH_STAY_FAILURE = "FETCH_STAY_FAILURE";
export const UPDATE_STAY_REQUEST = "UPDATE_TRAVEL_REQUEST";
export const UPDATE_STAY_SUCCESS = "UPDATE_TRAVEL_SUCCESS";
export const UPDATE_STAY_FAILURE = "UPDATE_TRAVEL_FAILURE";
export const ADD_REVIEW_SUCCESS = "ADD_REVIEW_SUCCESS";
export const ADD_REVIEW_FAILURE = "ADD_REVIEW_FAILURE";
export const ADD_STAY_OFFER_REQUEST = "ADD_STAY_OFFER_REQUEST";
export const ADD_STAY_OFFER_SUCCESS = "ADD_STAY_OFFER_SUCCESS";
export const ADD_STAY_OFFER_FAILURE = "ADD_STAY_OFFER_FAILURE";
export const DELETE_STAY_OFFER = "DELETE_STAY_OFFER";
export const TOGGLE_STAY_FAVORITE = "TOGGLE_STAY_FAVORITE";

export const ADD_TO_CART_TRAVEL = "ADD_TO_CART_TRAVEL";
export const ADD_TO_CART_STAY = "ADD_TO_CART_STAY";
export const REMOVE_FROM_CART_TRAVEL = "REMOVE_FROM_CART_TRAVEL";

export const REMOVE_FROM_CART_STAY = "REMOVE_FROM_CART_STAY";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";

export const ADD_TO_CART_ROOM = "ADD_TO_CART_ROOM";
export const ADD_TO_CART_TOUR = "ADD_TO_CART_TOUR";
export const REMOVE_FROM_CART_ROOM = "REMOVE_FROM_CART_ROOM";
export const REMOVE_FROM_CART_TOUR = "REMOVE_FROM_CART_TOUR";

export const SET_USER = "SET_USER";

export const fetchTravelRequest = () => ({
  type: FETCH_TRAVEL_REQUEST,
});

export const fetchTravelSuccess = (data) => ({
  type: FETCH_TRAVEL_SUCCESS,
  payload: data,
});

export const fetchTravelFailure = (error) => ({
  type: FETCH_TRAVEL_FAILURE,
  payload: error,
});

export const fetchTravelOffers = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_TRAVEL_REQUEST });

    const response = await fetch("http://localhost:3030/travel");
    const data = await response.json();
    console.log(data);

    dispatch({ type: FETCH_TRAVEL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_TRAVEL_FAILURE, payload: error.message });
  }
};

export const fetchResultsOffers = (searchQuery, maxBudget) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_TRAVEL_REQUEST" });

    const response = await fetch(`http://localhost:3030/travel?query=${searchQuery}`);
    const data = await response.json();

    dispatch({ type: "FETCH_TRAVEL_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_TRAVEL_FAILURE", payload: error.message });
  }
};

export const updateTravelOffer = (offerData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TRAVEL_REQUEST });

    const response = await fetch(`http://localhost:3030/travel/${offerData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offerData),
    });

    const data = await response.json();

    dispatch({ type: UPDATE_TRAVEL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_TRAVEL_FAILURE, payload: error.message });
  }
};

export const fetchstayOffers = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_STAY_REQUEST });

    const response = await fetch("http://localhost:3030/hotels");
    const data = await response.json();
    console.log(data);

    dispatch({ type: FETCH_STAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_STAY_FAILURE, payload: error.message });
  }
};

export const updateStayOffer = (offerData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TRAVEL_REQUEST });

    const response = await fetch(`http://localhost:3030/hotels/${offerData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offerData),
    });

    const data = await response.json();

    dispatch({ type: UPDATE_TRAVEL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_TRAVEL_FAILURE, payload: error.message });
  }
};

export const addToCartTravel = (item) => {
  return {
    type: ADD_TO_CART_TRAVEL,
    payload: item,
  };
};

export const addToCartStay = (item) => ({
  type: ADD_TO_CART_STAY,
  payload: item,
});

export const addToCartRoom = (room) => ({
  type: ADD_TO_CART_ROOM,
  payload: room,
});

export const addToCartTour = (tour) => ({
  type: ADD_TO_CART_ROOM,
  payload: tour,
});

export const removeFromCartTravel = (productId) => ({
  type: REMOVE_FROM_CART_TRAVEL,
  payload: productId,
});

export const removeFromCartStay = (productId) => ({
  type: REMOVE_FROM_CART_STAY,
  payload: productId,
});

export const removeFromCartRoom = (roomId) => ({
  type: REMOVE_FROM_CART_ROOM,
  payload: roomId,
});

export const removeFromCartTour = (tourId) => ({
  type: REMOVE_FROM_CART_ROOM,
  payload: tourId,
});

export const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { productId, quantity },
});

export const setFormData = (formData) => ({
  type: "SET_FORM_DATA",
  payload: formData,
});

export const registrationSuccess = (responseData) => ({
  type: "REGISTRATION_SUCCESS",
  payload: responseData,
});

export const registrationFailure = (error) => ({
  type: "REGISTRATION_FAILURE",
  payload: error,
});

export const setShowSuccessAlert = (value) => ({
  type: "SET_SHOW_SUCCESS_ALERT",
  payload: value,
});

export const registerUser = (formData) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3030/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        dispatch(registrationSuccess(responseData));
        return responseData;
      } else {
        console.error("Errore durante la registrazione");
        dispatch(registrationFailure("Errore durante la registrazione"));
        return { userExists: false };
      }
    } catch (error) {
      console.error("Si è verificato un errore durante la registrazione", error);
      dispatch(registrationFailure("Si è verificato un errore durante la registrazione"));
      return { userExists: false };
    }
  };
};

export const setUserExists = (value) => ({
  type: "SET_USER_EXISTS",
  payload: value,
});

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const updateRoom = (roomId, name, price) => ({
  type: "UPDATE_ROOM",
  payload: { roomId, name, price },
});

export const updateTour = (tourData) => ({
  type: "UPDATE_TOUR",
  payload: tourData,
});

export const addReviewSuccess = (review) => ({
  type: ADD_REVIEW_SUCCESS,
  payload: review,
});

export const addReviewFailure = (error) => ({
  type: ADD_REVIEW_FAILURE,
  payload: error,
});

export function addReview(review) {
  return { type: ADD_REVIEW_SUCCESS, payload: { review } };
}

export const createTravelOffer = (newOfferData) => ({
  type: CREATE_TRAVEL_OFFER,
  payload: newOfferData,
});

export const deleteTravelOffer = (offerId) => ({
  type: DELETE_TRAVEL_OFFER,
  payload: offerId,
});

export const deleteStayOffer = (offerId) => {
  return (dispatch) => {
    fetch(`http://localhost:3030/hotels/${offerId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          dispatch({
            type: DELETE_STAY_OFFER,
            payload: offerId,
          });
        } else {
          console.error("Errore durante l'eliminazione dell'offerta");
        }
      })
      .catch((error) => {
        console.error("Errore durante l'eliminazione dell'offerta:", error);
      });
  };
};

export const addStayOffer = (newOfferData) => (dispatch) => {
  dispatch({ type: ADD_STAY_OFFER_REQUEST });

  fetch("http://localhost:3030/hotels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOfferData),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else {
        throw new Error("Errore durante l'aggiunta dell'offerta");
      }
    })
    .then((data) => {
      dispatch({ type: ADD_STAY_OFFER_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: ADD_STAY_OFFER_FAILURE, payload: error });
    });
};

export const toggleFavorite = (offerId) => {
  return {
    type: TOGGLE_TRAVEL_FAVORITE,
    payload: offerId,
  };
};

export const toggleFavoriteTwo = (offerId) => {
  return {
    type: TOGGLE_STAY_FAVORITE,
    payload: offerId,
  };
};

export const updateOffer = (offer) => {
  return {
    type: "UPDATE_OFFER",
    payload: offer,
  };
};

export const addReviewTwo = (roomId, user, rating, comment) => {
  return {
    type: "ADD_REVIEW",
    payload: {
      roomId,
      user,
      rating,
      comment,
    },
  };
};

export const addReviewThree = (tourId, user, rating, comment) => {
  return {
    type: "ADD_REVIEW",
    payload: {
      tourId,
      user,
      rating,
      comment,
    },
  };
};
