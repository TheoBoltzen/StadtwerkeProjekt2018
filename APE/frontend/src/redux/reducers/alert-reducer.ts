import { alertConstants } from "../../constants";
import { Action } from "redux";

/** Interface declaration of action **/
interface ActionAlert extends Action {
  message: string;
}

/** Interface declaration of state **/
export interface AlertReducer {
  readonly type?: string;
  readonly message?: string;
}

export const alertReducer = (state: AlertReducer = {}, action: ActionAlert) => {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: "alert-success",
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: "alert-danger",
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    case alertConstants.SAVE:
      return { ...state };
    default:
      return state;
  }
};
