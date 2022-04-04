import { combineReducers } from "redux";
import CategoryReducer from "./reducer/Category.reducer";
import RegisterReducer from './reducer/Register.reducer';

const rootReducer = combineReducers({
    CategoryReducer,
    RegisterReducer
});

export default rootReducer;