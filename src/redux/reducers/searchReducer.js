const initialState = {
  results: [],
  loading: false,
  error: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TRAVEL_REQUEST":
      return { ...state, loading: true };
    case "FETCH_TRAVEL_SUCCESS":
      return { ...state, loading: false, results: action.payload, error: null };
    case "FETCH_TRAVEL_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default searchReducer;
