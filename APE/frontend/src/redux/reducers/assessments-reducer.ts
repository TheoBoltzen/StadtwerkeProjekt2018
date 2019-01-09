import { Action } from "redux";
import { trainerDevelopmentFormConstants, traineeDevelopmentFormConstants } from "../../constants";

interface AssessmentsFormAction extends Action {}

export interface AssessmentsReducer {}

const initialState: AssessmentsReducer = {};

export const trainerAssessmentReducer = (state = initialState, action: AssessmentsFormAction) => {
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

export const traineeAssessmentReducer = (state = initialState, action: AssessmentsFormAction) => {
  switch (action.type) {
    case traineeDevelopmentFormConstants.SETDASSESSMENT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case traineeDevelopmentFormConstants.SETDASSESSMENT_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case traineeDevelopmentFormConstants.SETDASSESSMENT_FAILURE:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};
