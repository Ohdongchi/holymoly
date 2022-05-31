import axios from "axios";

export const ROOM_LIST_REQUEST = "ROOM_LIST_REQUEST";
export const ROOM_LIST_RESPONSE = "ROOM_LIST_RESPONSE";
export const ROOM_LIST_ERROR = "ROOM_LIST_ERROR";

const initState = {
  data: [],
  error: "",
};

export const roomListRequest = () => {
  console.log('roomList');
  return { type: ROOM_LIST_REQUEST };
};


const RoomListReducer = (state = initState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ROOM_LIST_REQUEST:
      return state;
    case ROOM_LIST_RESPONSE:
      return {
        ...state,
        payload: action.payload,
      };
    case ROOM_LIST_ERROR:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state;
  }
};

export default RoomListReducer;
