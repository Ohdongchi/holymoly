export const CREATE_CHAT_ROOM_MODAL = "CREATE_CHAT_ROOM_MODAL";

export const CREATE_CHAT_ROOM_REQUEST = "CREATE_CHAT_ROOM_REQUEST";
export const CREATE_CHAT_ROOM_RESPONSE = "CREATE_CHAT_ROOM_RESPONSE";
export const CREATE_CHAT_ROOM_ERROR = "CREATE_CHAT_ROOM_ERROR";

const initState = {
    isOpen: false,
};

export const createChatRoomIsOpenModalRequest = () => {
    return {
        type: CREATE_CHAT_ROOM_MODAL,
    };
}

const createChatRoomModalReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE_CHAT_ROOM_MODAL:
            return {
                ...state,
                isOpen: state.isOpen ? false : true,
            }
        default:
            return state;
    }
}

export default createChatRoomModalReducer;