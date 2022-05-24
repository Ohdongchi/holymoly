import { combineReducers } from "redux";
import CategoryReducer from "./reducer/Category.reducer";
import RegisterReducer from './reducer/Register.reducer';
import SendMessageReducer from "./reducer/SendMessage.reducer";
import LoginReducer from "./reducer/Login.reducer";
import createChatRoomModalReducer from "./reducer/CreateChatRoom.reducer";
const rootReducer = combineReducers({
    CategoryReducer,
    RegisterReducer,
    SendMessageReducer,
    LoginReducer,
    createChatRoomModalReducer
});

export default rootReducer;