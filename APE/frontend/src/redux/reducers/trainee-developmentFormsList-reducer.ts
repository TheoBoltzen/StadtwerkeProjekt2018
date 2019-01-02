import { Action } from "redux";
import { DevelopmentFormsListTrainee } from "../../types";
import { traineeDevFormListConstants } from "../../constants";

interface ActionDevelopmentForm extends Action {
  traineeDevelopmentFormsList: DevelopmentFormsListTrainee[];
}

export interface TraineeDevelopmentFormsListReducer {
  readonly loading: boolean;
  readonly traineeDevelopmentFormsList: DevelopmentFormsListTrainee[];
}

const initialState: TraineeDevelopmentFormsListReducer = {
  loading: false,
  traineeDevelopmentFormsList: []
};

export const traineeDevelopmentFormsListReducer = (
  state = initialState,
  action: ActionDevelopmentForm
) => {
  switch (action.type) {
    case traineeDevFormListConstants.GETALL_REQUEST:
      console.log("getall_request: ", state.loading);
      return {
        ...state,
        loading: true
      };
    case traineeDevFormListConstants.GETALL_SUCCESS:
      console.log("getall_success: ", state.loading);
      return {
        ...state,
        loading: false,
        traineeDevelopmentFormsList: action.traineeDevelopmentFormsList
      };
    case traineeDevFormListConstants.GETALL_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
};
