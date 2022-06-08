import { combineReducers } from "redux";

import SendMessageReducer from "./reducer/SendMessage.reducer";
import LoginReducer from "./reducer/Login.reducer";
import CreateChatRoomModalReducer from "./reducer/CreateChatRoomModal.reducer";
import VerifyReducer from "./reducer/UserVerify.reducer";
import RoomPersonelReducer from "./reducer/RoomPersonle.reducer";
import RoomListReducer from "./reducer/RoomList.reducer";

const rootReducer = combineReducers({
    SendMessageReducer,
    LoginReducer,
    CreateChatRoomModalReducer,
    VerifyReducer,
    RoomPersonelReducer,
    RoomListReducer,
});

export default rootReducer;