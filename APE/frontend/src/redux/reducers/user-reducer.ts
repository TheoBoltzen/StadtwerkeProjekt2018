import { userConstants } from "../../constants";
import { Action } from "redux";
import { User } from "../../types";

interface ActionUser extends Action {
  role: string;
  users: User[];
  error: string;
}

export interface UserReducer {
  readonly loading: boolean;
  readonly role: string;
  readonly users: User[];
}

const initialState: UserReducer = {
  loading: false,
  role: "",
  users: []
};

export const userReducer = (state = initialState, action: ActionUser) => {
  switch (action.type) {
    case userConstants.GETROLE_REQUEST:
      return {
        ...state,
        loading: true,
        role: ""
      };
    case userConstants.GETROLE_SUCESS:
      return {
        ...state,
        role: action.role,
        loading: false
      };
    case userConstants.GETROLE_FAILURE:
      return {
        ...state,
        role: "",
        loading: false,
        error: action.error
      };

    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};
