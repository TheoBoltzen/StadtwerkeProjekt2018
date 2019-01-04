import { traineeTabConstants, trainerDevelopmentFormConstants } from "../../constants";
import { ConnectedDevSheetFetch, Trainee } from "../../types";
import { Dispatch } from "redux";
import { getAllTraineesService } from "../../services";
import { errorAlert } from "./alert";
import { getAllConnectedDevelopmentSheetsService } from "../../services/trainer-connected-developmentsheets-services";

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
