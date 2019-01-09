import { traineeDevelopmentFormConstants, trainerDevelopmentFormConstants } from "../../constants";
import { Dispatch } from "redux";
import { errorAlert, successAlert } from "./alert";
import { setTraineeAssessmentService, setTrainerAssessmentService } from "../../services";
import { TraineesAssessments, TrainerAssessments } from "../../types";

export const setTraineeAssessments = (traineeAssessments: TraineesAssessments[]) => {
  const request = traineeAssessments => {
    return {
      type: traineeDevelopmentFormConstants.SETDASSESSMENT_REQUEST,
      traineeAssessments
    };
  };

  const success = () => {
    return { type: traineeDevelopmentFormConstants.SETDASSESSMENT_SUCCESS };
  };

  const failure = (error: string) => {
    return { type: traineeDevelopmentFormConstants.SETDASSESSMENT_FAILURE, error };
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
      type: trainerDevelopmentFormConstants.SETDASSESSMENT_REQUEST,
      trainerAssessments
    };
  };

  const success = () => {
    return { type: trainerDevelopmentFormConstants.SETDASSESSMENT_SUCCESS };
  };

  const failure = (error: string) => {
    return { type: trainerDevelopmentFormConstants.SETDASSESSMENT_FAILURE, error };
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
