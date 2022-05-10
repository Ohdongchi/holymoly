export const MESSAGE_REQUEST = "MESSAGE_REQUEST";
export const MESSAGE_RESPONSE = "MESSAGE_REQUEST";
export const MESSAGE_ERROR = "MESSAGE_ERROR";

const initState = {
    payload: {},
    error: "",
}

export const sendSocketMessageRequest = (e) => {
    return {
        type: MESSAGE_REQUEST,
    }
}

const SendMessageReducer = (state = initState, action) => {
    switch (action.type) {
        case MESSAGE_RESPONSE:
            return state;
        case MESSAGE_RESPONSE:
            return {
                ...state,
                payload: action.payload,
            };
        case MESSAGE_ERROR:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
}

export default SendMessageReducer;