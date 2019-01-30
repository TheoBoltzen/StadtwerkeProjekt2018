import { userConstants } from "../../constants";
import { Action } from "redux";
import { User } from "../../types";

/** Interface declaration of action **/
interface ActionUser extends Action {
  user: User;
}

/** Interface declaration of state **/
export interface AuthenticationReducer {
  readonly loggingIn?: boolean;
  readonly loggedIn?: boolean;
  readonly user?: User | string;
}

//Get user from localStorage
let user = localStorage.getItem("user");

//Set initial state
const initialState: AuthenticationReducer = user ? { loggedIn: true, user } : { user: "" };

export const authenticationReducer = (state = initialState, action: ActionUser) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
};
