export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_RESPONSE = "LOGIN_RESPONSE";
export const LOGIN_ERROR = "LOGIN_ERROR";

const initState = {
    payload: null,
    error: "",
}

export const loginRequest = (payload) => {
    return {
        type: LOGIN_REQUEST,
        payload
    }
}

const LoginReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return state;
        case LOGIN_RESPONSE:
            return {
                ...state,
                payload: action.payload
            }
        case LOGIN_ERROR:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default LoginReducer;