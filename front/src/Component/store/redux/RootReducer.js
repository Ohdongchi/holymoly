import { combineReducers } from "redux";
import CategoryReducer from "./reducer/Category.reducer";
import RegisterReducer from './reducer/Register.reducer';
import SendMessageReducer from "./reducer/SendMessageReducer";
import LoginReducer from "./reducer/LoginReducer";
const rootReducer = combineReducers({
    CategoryReducer,
    RegisterReducer,
    SendMessageReducer,
    LoginReducer
});

export default rootReducer;