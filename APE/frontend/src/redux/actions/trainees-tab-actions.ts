import { traineeTabConstants, trainerDevelopmentFormConstants } from "../../constants";
import { ConnectedDevSheetFetch, FullDevSheetFetch, Trainee } from "../../types";
import { Dispatch } from "redux";
import { getAllTraineesService, getFullDevSheetAsTrainerService } from "../../services";
import { errorAlert, successAlert } from "./alert";
import {
  getAllConnectedDevelopmentSheetsService,
  setTrainerToTraineeDevelopmentSheetService
} from "../../services/trainer-connected-developmentsheets-services";

//Action to get all Trainees
export const getAllTrainees = () => {
  //Request without any parameter
  const request = () => {
    return { type: traineeTabConstants.GETALL_REQUEST };
  };

  //Success should return an array with all trainees
  const success = (trainees: Trainee[]) => {
    return { type: traineeTabConstants.GETALL_SUCCESS, trainees };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: traineeTabConstants.GETALL_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request());

    //Call Service function
    getAllTraineesService().then(
      trainees => dispatch(success(trainees)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

//Action to get all DevelopmentSheets for a trainer
export const getAllConnectedDevSheets = () => {
  //Request without any parameter
  const request = () => {
    return { type: trainerDevelopmentFormConstants.GETALL_CONNECTEDDEVSHEETS_REQUEST };
  };

  //Success should return an array with all DevelopmenSheets
  const success = (connectedDevSheets: ConnectedDevSheetFetch[]) => {
    return {
      type: trainerDevelopmentFormConstants.GETALL_CONNECTEDDEVSHEETS_SUCCESS,
      connectedDevSheets
    };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: trainerDevelopmentFormConstants.GETALL_CONNECTEDDEVSHEETS_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request());

    //Call Service function
    getAllConnectedDevelopmentSheetsService().then(
      connectedDevSheets => dispatch(success(connectedDevSheets)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

//Action to assign Trainer to DevelopmentSheet
export const setTrainerToTraineeDevelopmentSheet = (
  traineeUsername: string,
  devSheetID: string
) => {
  //Request with DevelopmentSheet ID and the username of a trainee
  const request = (traineeUsername, devSheetID) => {
    return {
      type: trainerDevelopmentFormConstants.SETDEVSHEET_REQUEST,
      traineeUsername,
      devSheetID
    };
  };

  //Success without any returning values
  const success = () => {
    return {
      type: trainerDevelopmentFormConstants.SETDEVSHEET_SUCCESS
    };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: trainerDevelopmentFormConstants.SETDEVSHEET_FAILURE, error };
  };

  return async (dispatch: Dispatch) => {
    await dispatch(request(traineeUsername, devSheetID));

    //Call Service function
    await setTrainerToTraineeDevelopmentSheetService(traineeUsername, devSheetID).then(
      () => {
        dispatch(success());
        dispatch(successAlert("Bogen erfolgreich zugewiesen"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

//Action to get a DevelopmentSheet with all details as a trainer
export const getFullDevSheetAsTrainer = (
  devSheetId: number,
  traineeUsername: string,
  trainerUsername: string
) => {
  //Request with DevelopmentSheet ID, a username of a trainee and a username of a trainer
  const request = (devSheetId, traineeUsername, trainerUsername) => {
    return {
      type: trainerDevelopmentFormConstants.GETFULLDEVSHEET_REQUEST,
      devSheetId,
      traineeUsername,
      trainerUsername
    };
  };

  //Success should return a complete DevelopmentSheet
  const success = (devSheet: FullDevSheetFetch) => {
    return { type: trainerDevelopmentFormConstants.GETFULLDEVSHEET_SUCCESS, devSheet };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: trainerDevelopmentFormConstants.GETFULLDEVSHEET_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(devSheetId, traineeUsername, trainerUsername));

    //Call Service function
    getFullDevSheetAsTrainerService(devSheetId, traineeUsername, trainerUsername).then(
      devSheet => dispatch(success(devSheet)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};
