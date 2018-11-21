import { userConstants } from "../../constants";
import { Action } from "redux";

interface ActionUser extends Action {
  role: string;
}

export interface UserReducer {
  readonly loading: boolean;
  readonly role: string;
}

const initialState: UserReducer = {
  loading: false,
  role: ""
};

export const userReducer = (state = initialState, action: ActionUser) => {
  switch (action.type) {
    // case userConstants.GETALL_REQUEST:
    //   return {
    //     loading: true
    //   };
    // case userConstants.GETALL_SUCCESS:
    //   return {
    //     items: action.users
    //   };
    // case userConstants.GETALL_FAILURE:
    //   return {
    //     error: action.error
    //   };
    case userConstants.GETROLE_REQUEST:
      return {
        loading: true,
        role: ""
      };
    case userConstants.GETROLE_SUCESS:
      return {
        role: action.role,
        loading: false
      };
    case userConstants.GETROLE_FAILURE:
      return {
        role: "",
        loading: false
      };
    default:
      return state;
  }
};
