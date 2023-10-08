export const FETCH_TRAVEL_REQUEST = "FETCH_TRAVEL_REQUEST";
export const FETCH_TRAVEL_SUCCESS = "FETCH_TRAVEL_SUCCESS";
export const FETCH_TRAVEL_FAILURE = "FETCH_TRAVEL_FAILURE";

export const FETCH_STAY_REQUEST = "FETCH_STAY_REQUEST";
export const FETCH_STAY_SUCCESS = "FETCH_STAY_SUCCESS";
export const FETCH_STAY_FAILURE = "FETCH_STAY_FAILURE";

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

    dispatch({ type: FETCH_TRAVEL_SUCCESS, payload: data }); // Azione di successo
  } catch (error) {
    dispatch({ type: FETCH_TRAVEL_FAILURE, payload: error.message }); // Azione di errore
  }
};

export const fetchstayOffers = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_STAY_REQUEST }); // Azione di richiesta

    const response = await fetch("http://localhost:3030/hotels");
    const data = await response.json();
    console.log(data);

    dispatch({ type: FETCH_STAY_SUCCESS, payload: data }); // Azione di successo
  } catch (error) {
    dispatch({ type: FETCH_STAY_FAILURE, payload: error.message }); // Azione di errore
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
          dispatch(setShowUserExistsAlert(true)); // Mostra l'alert utente già registrato
        } else {
          dispatch(setShowSuccessAlert(true)); // Mostra l'alert di successo
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
