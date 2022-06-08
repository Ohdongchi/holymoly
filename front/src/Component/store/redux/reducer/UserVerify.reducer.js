export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_RESPONSE = "VERIFY_RESPONSE";
export const VERIFY_ERROR = "VERIFY_ERROR";
export const VERIFY_CLEAR = "VERIFY_CLEAR";

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

export const tokenVerifyClear = () => {
    return {
        type: VERIFY_CLEAR
    }
}

const VerifyReducer = (state = initState, action) => {
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
        case VERIFY_CLEAR:
            return {
                payload: null,
                error: ""
            }
        default:
            return state;
    }
}

export default VerifyReducer;