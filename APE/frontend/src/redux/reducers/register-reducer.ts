import { Action } from "redux";
import { userConstants } from "../../constants";

interface ActionRegisterUser extends Action {}

export interface RegisterUserReducer {
  readonly loading: boolean;
}

const initialState: RegisterUserReducer = {
  loading: false
};

export const registerUserReducer = (state = initialState, action: ActionRegisterUser) => {
  switch (action.type) {
    case userConstants.CREATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.CREATE_SUCCESS:
      return {
        loading: false
      };
    case userConstants.CREATE_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
};
