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
      return {
        ...state,
        loading: true
      };
    case traineeDevFormListConstants.GETALL_SUCCESS:
      return {
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
