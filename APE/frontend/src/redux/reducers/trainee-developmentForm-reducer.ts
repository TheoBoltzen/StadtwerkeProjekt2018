import { Action } from "redux";
import { traineeDevelopmentFormConstants } from "../../constants";

export interface TraineeDevelopmentFormsReducer {
  readonly loading: boolean;
}

const initialState: TraineeDevelopmentFormsReducer = {
  loading: false
};

export const traineeDevelopmentFormsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case traineeDevelopmentFormConstants.SETDEVSHEET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case traineeDevelopmentFormConstants.SETDEVSHEET_SUCCESS:
      return {
        loading: false
      };
    case traineeDevelopmentFormConstants.SETDEVSHEET_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
};
