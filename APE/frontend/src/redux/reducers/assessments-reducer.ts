import { Action } from "redux";
import { assessmentsConstants } from "../../constants";

/** Interface declaration of action **/
interface AssessmentsFormAction extends Action {}

/** Interface declaration of state **/
export interface AssessmentsReducer {
  loading: boolean;
  loadingStatusEstimated: boolean;
}

//Set initial state
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

    case assessmentsConstants.SETSTATUSCOMPLETED_TRAINEE_REQUEST:
      return {
        ...state,
        loadingStatusEstimated: true
      };
    case assessmentsConstants.SETSTATUSCOMPLETED_TRAINEE_SUCCESS:
      return {
        ...state,
        loadingStatusEstimated: false
      };
    case assessmentsConstants.SETSTATUSCOMPLETED_TRAINEE_FAILURE:
      return {
        ...state,
        loadingStatusEstimated: false
      };

    default:
      return state;
  }
};
