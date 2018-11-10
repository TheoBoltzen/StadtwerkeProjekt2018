import { combineReducers } from "redux";
import { alertReducer } from "./alert-reducer";
import { userReducer } from "./user-reducer";
import { authenticationReducer } from "./authentication-reducer";

const rootReducer = combineReducers({
  alertReducer,
  userReducer,
  authenticationReducer
});

export default rootReducer;
