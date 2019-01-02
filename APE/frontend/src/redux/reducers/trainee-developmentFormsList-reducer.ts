import { Action } from "redux";
import { DevelopmentFormsListTrainee } from "../../types";
import { traineeDevFormListConstants } from "../../constants";

interface ActionDevelopmentForm extends Action {
  taineeDevelopmentFormsList: DevelopmentFormsListTrainee[];
}

export interface TraineeDevelopmentFormsListReducer {
  readonly loading: boolean;
  readonly taineeDevelopmentFormsList: DevelopmentFormsListTrainee[];
}

const initialState: TraineeDevelopmentFormsListReducer = {
  loading: false,
  taineeDevelopmentFormsList: []
};

export const traineeDevelopmentFormsListReducer = (
  state = initialState,
  action: ActionDevelopmentForm
) => {
  switch (action.type) {
    case traineeDevFormListConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case traineeDevFormListConstants.GETALL_SUCCESS:
      return {
        loading: false,
        taineeDevelopmentFormsList: action.taineeDevelopmentFormsList
      };
    case traineeDevFormListConstants.GETALL_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
};
