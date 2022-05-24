export const MESSAGE_REQUEST = "MESSAGE_REQUEST";
export const MESSAGE_RESPONSE = "MESSAGE_REQUEST";
export const MESSAGE_ERROR = "MESSAGE_ERROR";

const initState = {
    payload: {},
    error: "",
}

export const sendSocketMessageRequest = (ev, payload, token) => {
    console.log("ev", ev);
    console.log("payload", payload);
    return {
        type: MESSAGE_REQUEST,
        payload,
        ev,
        token,
    }
}

// export const sendSocketMessageRESPONSE = (payload) => {
//     return {
//         type: MESSAGE_RESPONSE,
//         payload
//     }
// }
// export const sendSocketMessageError = (err) => {
//     return {
//         type: MESSAGE_ERROR,
//         error: err,
//     }
// }

const SendMessageReducer = (state = initState, action) => {
    switch (action.type) {
        case MESSAGE_REQUEST:
            console.log("req");
            return state;
        case MESSAGE_RESPONSE:
            console.log("res");
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