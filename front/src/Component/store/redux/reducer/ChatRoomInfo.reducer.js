export const CHAT_ROOM_INFO_REQUEST = "CHAT_ROOM_INFO_REQUEST";
export const CHAT_ROOM_INFO_RESPONSE = "CHAT_ROOM_INFO_RESPONSE";
export const CHAT_ROOM_INFO_ERROR = "CHAT_ROOM_INFO_ERROR";

const initState = {
    payload: null,
    error: null,
}

export const chatRoomInfoRequest = (payload) => {
    
    return {
        type: CHAT_ROOM_INFO_REQUEST,
        payload
    };
}

const chatRoomInfoReducer = (state = initState, action) => {
    switch (action.type) {
        case CHAT_ROOM_INFO_REQUEST:
            return state;
        case CHAT_ROOM_INFO_RESPONSE:
            return {
                ...state,
                payload: action.payload
            }
        case CHAT_ROOM_INFO_ERROR:
            return {
                ...state,
                error: "chat room info API Error"
            }
        default:
            return state;
    }
}

export default chatRoomInfoReducer;