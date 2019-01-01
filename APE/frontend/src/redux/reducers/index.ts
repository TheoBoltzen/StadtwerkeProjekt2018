import { combineReducers } from "redux";
import { AlertReducer, alertReducer } from "./alert-reducer";
import { UserReducer, userReducer } from "./user-reducer";
import { AuthenticationReducer, authenticationReducer } from "./authentication-reducer";
import { developmentFormsReducer, DevelopmentFormsReducer } from "./development-forms-reducer";
import {
  singleDevelopmentFormReducer,
  SingleDevelopmentFormReducer
} from "./single-development-form-reducer";
import {
  traineeDevelopmentFormsReducer,
  TraineeDevelopmentFormsReducer
} from "./trainee-developmentForm-reducer";
import { TraineesTabReducer, traineeTabReducer } from "./trainees-tab-reducer";
import { registerUserReducer, RegisterUserReducer } from "./register-reducer";

export interface ApplicationState {
  authenticationReducer: AuthenticationReducer;
  alertReducer: AlertReducer;
  userReducer: UserReducer;
  developmentFormsReducer: DevelopmentFormsReducer;
  singleDevelopmentFormReducer: SingleDevelopmentFormReducer;
  traineeDevelopmentFormsReducer: TraineeDevelopmentFormsReducer;
  traineeTabReducer: TraineesTabReducer;
  registerUserReducer: RegisterUserReducer;
}

const rootReducer = combineReducers<ApplicationState>({
  alertReducer,
  userReducer,
  authenticationReducer,
  developmentFormsReducer,
  singleDevelopmentFormReducer,
  traineeDevelopmentFormsReducer,
  traineeTabReducer,
  registerUserReducer
});

export default rootReducer;
