import { combineReducers } from "redux";
import CategoryReducer from "./reducer/Category.reducer";
import RegisterReducer from './reducer/Register.reducer';
import SendMessageReducer from "./reducer/SendMessageReducer";
const rootReducer = combineReducers({
    CategoryReducer,
    RegisterReducer,
    SendMessageReducer,
});

export default rootReducer;