import axios from "axios";

export const RoomList_REQUEST = "RoomList_REQUEST";
export const RoomList_RESPONSE = "RoomList_RESPONSE";
export const RoomList_ERROR = "RoomList_ERROR";

const initState = {
  data: [],
  error: "",
};

export const RoomListRequest = (token) => {
  return { type: RoomList_REQUEST, token };
};


const RoomListReducer = (state = initState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case RoomList_REQUEST:
      return {
        ...state,
      };
    case RoomList_RESPONSE:
      return {
        ...state,
        data: action.payload,
      };
    case RoomList_ERROR:
      return state;
    default:
      return state;
  }
};

export default RoomListReducer;
