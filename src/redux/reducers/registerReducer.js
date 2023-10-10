const initialState = {
  formData: {
    username: "",
    email: "",
    password: "",
    gender: "",
  },
  registrationResponse: null,
  showSuccessAlert: false,
  error: null,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return {
        ...state,
        formData: action.payload,
      };
    case "REGISTRATION_SUCCESS":
      return {
        ...state,
        registrationResponse: action.payload,
        error: null,
      };
    case "REGISTRATION_FAILURE":
      return {
        ...state,
        registrationResponse: null,
        error: action.payload,
      };
    case "SET_SHOW_SUCCESS_ALERT":
      return {
        ...state,
        showSuccessAlert: action.payload,
      };
    default:
      return state;
  }
};

export default registerReducer;
