export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_RESPONSE = "REGISTER_RESPONSE";
export const REGISTER_ERROR = "REGISTER_ERROR";

const initState = {
  payload: {},
  error: "",
};

export const registerRequest = (e) => {
  return {
    type: REGISTER_REQUEST,
  };
};

export const registerResponse = (payload) => {
  return {
    type: REGISTER_RESPONSE,
    payload,
  };
};

export const registerError = (e) => {
  return {
    type: REGISTER_ERROR,
  };
};

const RegisterReducer = (state = initState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return state;
    case REGISTER_RESPONSE:
      return {
        ...state,
        payload: action.payload,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default RegisterReducer;
