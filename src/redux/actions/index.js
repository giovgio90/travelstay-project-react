export const FETCH_TRAVEL_REQUEST = "FETCH_TRAVEL_REQUEST";
export const FETCH_TRAVEL_SUCCESS = "FETCH_TRAVEL_SUCCESS";
export const FETCH_TRAVEL_FAILURE = "FETCH_TRAVEL_FAILURE";
export const UPDATE_TRAVEL_REQUEST = "UPDATE_TRAVEL_REQUEST";
export const UPDATE_TRAVEL_SUCCESS = "UPDATE_TRAVEL_SUCCESS";
export const UPDATE_TRAVEL_FAILURE = "UPDATE_TRAVEL_FAILURE";

export const FETCH_STAY_REQUEST = "FETCH_STAY_REQUEST";
export const FETCH_STAY_SUCCESS = "FETCH_STAY_SUCCESS";
export const FETCH_STAY_FAILURE = "FETCH_STAY_FAILURE";
export const UPDATE_STAY_REQUEST = "UPDATE_TRAVEL_REQUEST";
export const UPDATE_STAY_SUCCESS = "UPDATE_TRAVEL_SUCCESS";
export const UPDATE_STAY_FAILURE = "UPDATE_TRAVEL_FAILURE";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";

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
    dispatch({ type: FETCH_TRAVEL_REQUEST }); // Azione di richiesta

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

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
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

export const setShowUserExistsAlert = (value) => ({
  type: "SET_SHOW_USER_EXISTS_ALERT",
  payload: value,
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

        if (responseData.userExists) {
          dispatch(setShowUserExistsAlert(true));
        } else {
          dispatch(setShowSuccessAlert(true));
        }

        dispatch(registrationSuccess(responseData));
      } else {
        // La registrazione ha fallito
        console.error("Errore durante la registrazione");
        dispatch(registrationFailure("Errore durante la registrazione"));
      }
    } catch (error) {
      console.error("Si è verificato un errore durante la registrazione", error);
      dispatch(registrationFailure("Si è verificato un errore durante la registrazione"));
    }
  };
};

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
