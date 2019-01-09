import { Action } from "redux";
import { trainerDevelopmentFormConstants } from "../../constants";

interface AssessmentsFormAction extends Action {}

export interface AssessmentsReducer {}

const initialState: AssessmentsReducer = {};

export const trainerDevelopmentFormsReducer = (
  state = initialState,
  action: AssessmentsFormAction
) => {
  switch (action.type) {
    case trainerDevelopmentFormConstants.SETDASSESSMENT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case trainerDevelopmentFormConstants.SETDASSESSMENT_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case trainerDevelopmentFormConstants.SETDASSESSMENT_FAILURE:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};
