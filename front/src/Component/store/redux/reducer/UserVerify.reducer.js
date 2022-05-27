export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_RESPONSE = "VERIFY_RESPONSE";
export const VERIFY_ERROR = "VERIFY_ERROR";

const initState = {
    payload: null,
    error: ""
}

export const tokenVerify = (payload) => {
    return {
        type: VERIFY_REQUEST,
        payload
    }
}

const verifyReducer = (state = initState, action) => {
    switch (action.type) {
        case VERIFY_REQUEST:
            return state;
        case VERIFY_RESPONSE:
            
            return {
                ...state,
                payload: action.payload
            }
        case VERIFY_ERROR:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default verifyReducer;