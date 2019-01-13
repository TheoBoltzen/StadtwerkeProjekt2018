import { Action } from "redux";
import { assessmentsConstants } from "../../constants";

interface AssessmentsFormAction extends Action {}

export interface AssessmentsReducer {
  loading: boolean;
  loadingStatusEstimated: boolean;
}

const initialState: AssessmentsReducer = {
  loading: false,
  loadingStatusEstimated: false
};

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

    case assessmentsConstants.SETSTATUSRATED_TRAINER_REQUEST:
      return {
        ...state,
        loadingStatusEstimated: true
      };
    case assessmentsConstants.SETSTATUSRATED_TRAINER_SUCCESS:
      return {
        ...state,
        loadingStatusEstimated: false
      };
    case assessmentsConstants.SETSTATUSRATED_TRAINER_FAILURE:
      return {
        ...state,
        loadingStatusEstimated: false
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

    case assessmentsConstants.SETSTATUSESTIMATED_TRAINEE_REQUEST:
      return {
        ...state,
        loadingStatusEstimated: true
      };
    case assessmentsConstants.SETSTATUSESTIMATED_TRAINEE_SUCCESS:
      return {
        ...state,
        loadingStatusEstimated: false
      };
    case assessmentsConstants.SETSTATUSESTIMATED_TRAINEE_FAILURE:
      return {
        ...state,
        loadingStatusEstimated: false
      };

    default:
      return state;
  }
};
