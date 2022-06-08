import axios from "axios";

export const SIDE_ROOM_LIST_REQUEST = "ROOM_LIST_REQUEST";
export const SIDE_ROOM_LIST_RESPONSE = "ROOM_LIST_RESPONSE";
export const SIDE_ROOM_LIST_ERROR = "ROOM_LIST_ERROR";
export const ROOM_LIST_CLEAR = "ROOM_LIST_CLEAR";

export const MAIN_ROOM_LIST_REQUEST = "MAIN_ROOM_LIST_REQUEST";
export const MAIN_ROOM_LIST_RESPONSE = "MAIN_ROOM_LIST_RESPONSE";
export const MAIN_ROOM_LIST_ERROR = "MAIN_ROOM_LIST_ERROR";

const initState = {
  sideRoomList: [],
  mainRoomList: [],
  error: "",
};

export const sideRoomListRequest = () => {
  return { type: SIDE_ROOM_LIST_REQUEST };
};

export const mainRoomListRequest = () => {
  return {
    type: MAIN_ROOM_LIST_REQUEST
  };
}

export const roomListClear = () => {
  return {
    type: ROOM_LIST_CLEAR
  }
}


const RoomListReducer = (state = initState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SIDE_ROOM_LIST_REQUEST:
      return state;

    case MAIN_ROOM_LIST_REQUEST:
      
      return state;

    case SIDE_ROOM_LIST_RESPONSE:
      return {
        ...state,
        sideRoomList: action.payload,
      };

    case MAIN_ROOM_LIST_RESPONSE:
      return {
        ...state,
        mainRoomList: action.payload,
      }

    case SIDE_ROOM_LIST_ERROR :
      return {
        error: action.error,
      }

    case MAIN_ROOM_LIST_ERROR:
      return {
        error: action.error,
      }

    case ROOM_LIST_CLEAR:
      return {
        sideRoomList: null,
        mainRoomList: null,
        error: null
      }

    default:
      return state;
  }
};

export default RoomListReducer;
