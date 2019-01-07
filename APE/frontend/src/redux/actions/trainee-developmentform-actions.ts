import { traineeDevelopmentFormConstants } from "../../constants";
import { Dispatch } from "redux";
import { errorAlert, successAlert } from "./alert";
import { getFullDevSheetAsTraineeService, setDevelopmentSheetService } from "../../services";
import { EmptyDevSheetFetch } from "../../types";

export const setTraineeDevelopmentSheet = (devSheetID: string) => {
  const request = devSheetID => {
    return { type: traineeDevelopmentFormConstants.SETDEVSHEET_REQUEST, devSheetID }; //
  };

  const success = () => {
    return { type: traineeDevelopmentFormConstants.SETDEVSHEET_SUCCESS };
  };

  const failure = (error: string) => {
    return { type: traineeDevelopmentFormConstants.SETDEVSHEET_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(devSheetID));

    setDevelopmentSheetService(devSheetID).then(
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

export const getFullDevSheetAsTrainee = (devSheetId: number, trainerUsername: string) => {
  const request = (devSheetId, trainerUsername) => {
    return {
      type: traineeDevelopmentFormConstants.GETFULLDEVSHEET_REQUEST,
      devSheetId,
      trainerUsername
    };
  };

  const success = (devSheet: EmptyDevSheetFetch) => {
    return { type: traineeDevelopmentFormConstants.GETFULLDEVSHEET_SUCCESS, devSheet };
  };

  const failure = (error: string) => {
    return { type: traineeDevelopmentFormConstants.GETFULLDEVSHEET_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(devSheetId, trainerUsername));

    getFullDevSheetAsTraineeService(devSheetId, trainerUsername).then(
      devSheet => dispatch(success(devSheet)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};
