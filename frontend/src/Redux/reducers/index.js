import { combineReducers } from "redux";
import authReducer from "./authReducer";
import convReducer from "./convReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({authReducer, convReducer, messageReducer })
export default rootReducer