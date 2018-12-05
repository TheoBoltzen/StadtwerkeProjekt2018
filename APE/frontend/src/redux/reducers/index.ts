import { combineReducers } from "redux";
import { AlertReducer, alertReducer } from "./alert-reducer";
import { UserReducer, userReducer } from "./user-reducer";
import { AuthenticationReducer, authenticationReducer } from "./authentication-reducer";
import { developmentFormsReducer, DevelopmentFormsReducer } from "./development-forms-reducer";

export interface ApplicationState {
  authenticationReducer: AuthenticationReducer;
  alertReducer: AlertReducer;
  userReducer: UserReducer;
  developmentFormsReducer: DevelopmentFormsReducer;
}

const rootReducer = combineReducers<ApplicationState>({
  alertReducer,
  userReducer,
  authenticationReducer,
  developmentFormsReducer
});

export default rootReducer;
