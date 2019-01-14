import { traineeTabConstants, trainerDevelopmentFormConstants } from "../../constants";
import { ConnectedDevSheetFetch, FullDevSheetFetch, Trainee } from "../../types";
import { Dispatch } from "redux";
import { getAllTraineesService, getFullDevSheetAsTrainerService } from "../../services";
import { errorAlert, successAlert } from "./alert";
import {
  getAllConnectedDevelopmentSheetsService,
  setTrainerToTraineeDevelopmentSheetService
} from "../../services/trainer-connected-developmentsheets-services";

export const getAllTrainees = () => {
  const request = () => {
    return { type: traineeTabConstants.GETALL_REQUEST };
  };

  const success = (trainees: Trainee[]) => {
    return { type: traineeTabConstants.GETALL_SUCCESS, trainees };
  };

  const failure = (error: string) => {
    return { type: traineeTabConstants.GETALL_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request());

    getAllTraineesService().then(
      trainees => dispatch(success(trainees)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

export const getAllConnectedDevSheets = () => {
  const request = () => {
    return { type: trainerDevelopmentFormConstants.GETALL_CONNECTEDDEVSHEETS_REQUEST };
  };

  const success = (connectedDevSheets: ConnectedDevSheetFetch[]) => {
    return {
      type: trainerDevelopmentFormConstants.GETALL_CONNECTEDDEVSHEETS_SUCCESS,
      connectedDevSheets
    };
  };

  const failure = (error: string) => {
    return { type: trainerDevelopmentFormConstants.GETALL_CONNECTEDDEVSHEETS_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request());

    getAllConnectedDevelopmentSheetsService().then(
      connectedDevSheets => dispatch(success(connectedDevSheets)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

export const setTrainerToTraineeDevelopmentSheet = (
  traineeUsername: string,
  devSheetID: string
) => {
  const request = (traineeUsername, devSheetID) => {
    return {
      type: trainerDevelopmentFormConstants.SETDEVSHEET_REQUEST,
      traineeUsername,
      devSheetID
    };
  };

  const success = () => {
    return {
      type: trainerDevelopmentFormConstants.SETDEVSHEET_SUCCESS
    };
  };

  const failure = (error: string) => {
    return { type: trainerDevelopmentFormConstants.SETDEVSHEET_FAILURE, error };
  };

  return async (dispatch: Dispatch) => {
    await dispatch(request(traineeUsername, devSheetID));

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

export const getFullDevSheetAsTrainer = (
  devSheetId: number,
  traineeUsername: string,
  trainerUsername: string
) => {
  const request = (devSheetId, traineeUsername, trainerUsername) => {
    return {
      type: trainerDevelopmentFormConstants.GETFULLDEVSHEET_REQUEST,
      devSheetId,
      traineeUsername,
      trainerUsername
    };
  };

  const success = (devSheet: FullDevSheetFetch) => {
    return { type: trainerDevelopmentFormConstants.GETFULLDEVSHEET_SUCCESS, devSheet };
  };

  const failure = (error: string) => {
    return { type: trainerDevelopmentFormConstants.GETFULLDEVSHEET_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(devSheetId, traineeUsername, trainerUsername));

    getFullDevSheetAsTrainerService(devSheetId, traineeUsername, trainerUsername).then(
      devSheet => dispatch(success(devSheet)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};
