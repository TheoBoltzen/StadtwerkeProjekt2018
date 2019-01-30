import { assessmentsConstants } from "../../constants";
import { Dispatch } from "redux";
import { errorAlert, successAlert } from "./alert";
import {
  setTraineeAssessmentService,
  setTraineeStatusCompletedService,
  setTraineeStatusEstimatedService,
  setTrainerAssessmentService,
  setTrainerStatusRatedService
} from "../../services";
import { TraineesAssessments, TrainerAssessments } from "../../types";

//Action to set Trainee Estimation
export const setTraineeAssessments = (traineeAssessments: TraineesAssessments[]) => {
  //Request with traineeAssesments
  const request = traineeAssessments => {
    return {
      type: assessmentsConstants.SETDASSESSMENT_TRAINEE_REQUEST,
      traineeAssessments
    };
  };

  //Success without any returning values
  const success = () => {
    return { type: assessmentsConstants.SETDASSESSMENT_TRAINEE_SUCCESS };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: assessmentsConstants.SETDASSESSMENT_TRAINEE_FAILURE, error };
  };

  return async (dispatch: Dispatch) => {
    await dispatch(request(traineeAssessments));

    //Call Service function
    await setTraineeAssessmentService(traineeAssessments).then(
      () => {
        dispatch(success());
        dispatch(successAlert("Einschätzung erfolgreich gespeichert"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

//Action to set Trainer Rating
export const setTrainerAssessments = (trainerAssessments: TrainerAssessments[]) => {
  //Request with TrainerAssemsments
  const request = trainerAssessments => {
    return {
      type: assessmentsConstants.SETDASSESSMENT_TRAINER_REQUEST,
      trainerAssessments
    };
  };

  //Success without any returning values
  const success = () => {
    return { type: assessmentsConstants.SETDASSESSMENT_TRAINER_SUCCESS };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: assessmentsConstants.SETDASSESSMENT_TRAINER_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(trainerAssessments));

    //Call Service function
    setTrainerAssessmentService(trainerAssessments).then(
      () => {
        dispatch(success());
        dispatch(successAlert("Bewertung wurde erfolgreich abgegeben"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

//Action to set Status to rated
export const setTrainerStatusRated = (devSheetID: string, traineeUsername: string) => {
  //Request with developmenSheet ID
  const request = devSheetID => {
    return {
      type: assessmentsConstants.SETSTATUSRATED_TRAINER_REQUEST,
      devSheetID,
      traineeUsername
    };
  };

  //Success without any returning values
  const success = () => {
    return { type: assessmentsConstants.SETSTATUSRATED_TRAINER_SUCCESS };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: assessmentsConstants.SETSTATUSRATED_TRAINER_FAILURE, error };
  };

  return async (dispatch: Dispatch) => {
    await dispatch(request(devSheetID));

    //Call Service function
    await setTrainerStatusRatedService(devSheetID, traineeUsername).then(
      () => {
        dispatch(success());
        dispatch(successAlert("Bogen wurde erfolgreich bewertet"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

//Action to set status to Estimated
export const setTraineeStatusEstimated = (devSheetID: string) => {
  //Request with developmenSheet ID
  const request = devSheetID => {
    return {
      type: assessmentsConstants.SETSTATUSESTIMATED_TRAINEE_REQUEST,
      devSheetID
    };
  };

  //Success without any returning values
  const success = () => {
    return { type: assessmentsConstants.SETSTATUSESTIMATED_TRAINEE_SUCCESS };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: assessmentsConstants.SETSTATUSESTIMATED_TRAINEE_FAILURE, error };
  };

  return async (dispatch: Dispatch) => {
    await dispatch(request(devSheetID));

    //Call Service function
    await setTraineeStatusEstimatedService(devSheetID).then(
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

//Action to set DevelopmentSheet Status to Complete
export const setTraineeStatusCompleted = (devSheetID: string) => {
  //Request with DevelopmentSheet ID
  const request = devSheetID => {
    return {
      type: assessmentsConstants.SETSTATUSCOMPLETED_TRAINEE_REQUEST,
      devSheetID
    };
  };

  //Success without any returning values
  const success = () => {
    return { type: assessmentsConstants.SETSTATUSCOMPLETED_TRAINEE_SUCCESS };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: assessmentsConstants.SETSTATUSCOMPLETED_TRAINEE_FAILURE, error };
  };

  return async (dispatch: Dispatch) => {
    await dispatch(request(devSheetID));

    //Call Service function
    await setTraineeStatusCompletedService(devSheetID).then(
      () => {
        dispatch(success());
        dispatch(successAlert("Bogen wurde erfolgreich unterschrieben"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};
