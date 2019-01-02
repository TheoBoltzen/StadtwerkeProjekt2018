import { Action } from "redux";
import { Trainee } from "../../types";
import { traineeTabConstants } from "../../constants";

interface ActionTraineesTabReducer extends Action {
  trainees: Trainee[];
}

export interface TraineesTabReducer {
  readonly loading: boolean;
  readonly trainees: Trainee[];
}

const initialState: TraineesTabReducer = {
  loading: false,
  trainees: []
};

export const traineeTabReducer = (state = initialState, action: ActionTraineesTabReducer) => {
  switch (action.type) {
    case traineeTabConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case traineeTabConstants.GETALL_SUCCESS:
      return {
        loading: false,
        trainees: action.trainees
      };
    case traineeTabConstants.GETALL_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
};
