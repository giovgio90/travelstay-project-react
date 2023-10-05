export const FETCH_TRAVEL_REQUEST = "FETCH_TRAVEL_REQUEST";
export const FETCH_TRAVEL_SUCCESS = "FETCH_TRAVEL_SUCCESS";
export const FETCH_TRAVEL_FAILURE = "FETCH_TRAVEL_FAILURE";

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
