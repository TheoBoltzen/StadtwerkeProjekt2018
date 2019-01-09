import { Action } from "redux";
import { assessmentsConstants } from "../../constants";

interface AssessmentsFormAction extends Action {}

export interface AssessmentsReducer {}

const initialState: AssessmentsReducer = {};

export const trainerAssessmentReducer = (state = initialState, action: AssessmentsFormAction) => {
  switch (action.type) {
    case assessmentsConstants.SETDASSESSMENT_TRAINER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case assessmentsConstants.SETDASSESSMENT_TRAINER_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case assessmentsConstants.SETDASSESSMENT_TRAINER_FAILURE:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};

export const traineeAssessmentReducer = (state = initialState, action: AssessmentsFormAction) => {
  switch (action.type) {
    case assessmentsConstants.SETDASSESSMENT_TRAINEE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case assessmentsConstants.SETDASSESSMENT_TRAINEE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case assessmentsConstants.SETDASSESSMENT_TRAINEE_FAILURE:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};
