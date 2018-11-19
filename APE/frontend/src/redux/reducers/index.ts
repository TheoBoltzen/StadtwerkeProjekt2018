import { combineReducers } from "redux";
import { AlertReducer, alertReducer } from "./alert-reducer";
import { userReducer } from "./user-reducer";
import { AuthenticationReducer, authenticationReducer } from "./authentication-reducer";

export interface ApplicationState {
  authenticationReducer: AuthenticationReducer;
  alertReducer: AlertReducer;
  userReducer: any;
}

const rootReducer = combineReducers<ApplicationState>({
  alertReducer,
  userReducer,
  authenticationReducer
});

export default rootReducer;
