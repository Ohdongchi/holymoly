import { combineReducers } from "redux";
import CategoryReducer from "./reducer/RoomList.reducer";
import RegisterReducer from './reducer/Register.reducer';
import SendMessageReducer from "./reducer/SendMessage.reducer";
import LoginReducer from "./reducer/Login.reducer";
import createChatRoomModalReducer from "./reducer/CreateChatRoom.reducer";
import verifyReducer from "./reducer/UserVerify.reducer";
import chatRoomInfoReducer from "./reducer/ChatRoomInfo.reducer";
const rootReducer = combineReducers({
    CategoryReducer,
    RegisterReducer,
    SendMessageReducer,
    LoginReducer,
    createChatRoomModalReducer,
    verifyReducer,
    chatRoomInfoReducer
});

export default rootReducer;