import { combineReducers } from "redux";
import CategoryReducer from "./reducer/RoomList.reducer";
import RegisterReducer from './reducer/Register.reducer';
import SendMessageReducer from "./reducer/SendMessage.reducer";
import LoginReducer from "./reducer/Login.reducer";
import CreateChatRoomModalReducer from "./reducer/CreateChatRoomModal.reducer";
import VerifyReducer from "./reducer/UserVerify.reducer";
import ChatRoomInfoReducer from "./reducer/ChatRoomInfo.reducer";
import RoomListReducer from "./reducer/RoomList.reducer";



const rootReducer = combineReducers({
    CategoryReducer,
    RegisterReducer,
    SendMessageReducer,
    LoginReducer,
    CreateChatRoomModalReducer,
    VerifyReducer,
    ChatRoomInfoReducer,
    RoomListReducer,
});

export default rootReducer;