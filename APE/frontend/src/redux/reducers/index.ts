import { combineReducers } from "redux";
import { AlertReducer, alertReducer } from "./alert-reducer";
import { UserReducer, userReducer } from "./user-reducer";
import { AuthenticationReducer, authenticationReducer } from "./authentication-reducer";

export interface ApplicationState {
  authenticationReducer: AuthenticationReducer;
  alertReducer: AlertReducer;
  userReducer: UserReducer;
}

const rootReducer = combineReducers<ApplicationState>({
  alertReducer,
  userReducer,
  authenticationReducer
});

export default rootReducer;
