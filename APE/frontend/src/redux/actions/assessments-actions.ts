import { assessmentsConstants } from "../../constants";
import { Dispatch } from "redux";
import { errorAlert, successAlert } from "./alert";
import {
  setTraineeAssessmentService,
  setTraineeStatusEstimatedService,
  setTrainerAssessmentService
} from "../../services";
import { TraineesAssessments, TrainerAssessments } from "../../types";

export const setTraineeAssessments = (traineeAssessments: TraineesAssessments[]) => {
  const request = traineeAssessments => {
    return {
      type: assessmentsConstants.SETDASSESSMENT_TRAINEE_REQUEST,
      traineeAssessments
    };
  };

  const success = () => {
    return { type: assessmentsConstants.SETDASSESSMENT_TRAINEE_SUCCESS };
  };

  const failure = (error: string) => {
    return { type: assessmentsConstants.SETDASSESSMENT_TRAINEE_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(traineeAssessments));

    setTraineeAssessmentService(traineeAssessments).then(
      () => {
        dispatch(success());
        dispatch(successAlert("Werte erfolgreich zugewiesen"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

export const setTrainerAssessments = (trainerAssessments: TrainerAssessments[]) => {
  const request = trainerAssessments => {
    return {
      type: assessmentsConstants.SETDASSESSMENT_TRAINER_REQUEST,
      trainerAssessments
    };
  };

  const success = () => {
    return { type: assessmentsConstants.SETDASSESSMENT_TRAINER_SUCCESS };
  };

  const failure = (error: string) => {
    return { type: assessmentsConstants.SETDASSESSMENT_TRAINER_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(trainerAssessments));

    setTrainerAssessmentService(trainerAssessments).then(
      () => {
        dispatch(success());
        dispatch(successAlert("Werte erfolgreich zugewiesen"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

export const setTraineeStatusEstimated = (devSheetID: string) => {
  const request = devSheetID => {
    return {
      type: assessmentsConstants.SETSTATUSESTIMATED_TRAINEE_REQUEST,
      devSheetID
    };
  };

  const success = () => {
    return { type: assessmentsConstants.SETSTATUSESTIMATED_TRAINEE_SUCCESS };
  };

  const failure = (error: string) => {
    return { type: assessmentsConstants.SETSTATUSESTIMATED_TRAINEE_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(devSheetID));

    setTraineeStatusEstimatedService(devSheetID).then(
      () => {
        dispatch(success());
        dispatch(successAlert("Bogen wurde erfolgreich abgegeben"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};
