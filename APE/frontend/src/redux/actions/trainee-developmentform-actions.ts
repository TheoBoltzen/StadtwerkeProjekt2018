import { traineeDevelopmentFormConstants } from "../../constants";
import { Dispatch } from "redux";
import { errorAlert, successAlert } from "./alert";
import { getFullDevSheetAsTraineeService, setDevelopmentSheetService } from "../../services";
import { FullDevSheetFetch } from "../../types";

//Action to assign trainee to DevelopmenSheet
export const setTraineeDevelopmentSheet = (devSheetID: string) => {
  //Request with DevelopmentSheet ID
  const request = devSheetID => {
    return { type: traineeDevelopmentFormConstants.SETDEVSHEET_REQUEST, devSheetID }; //
  };

  //Success without any returning values
  const success = () => {
    return { type: traineeDevelopmentFormConstants.SETDEVSHEET_SUCCESS };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: traineeDevelopmentFormConstants.SETDEVSHEET_FAILURE, error };
  };

  return async (dispatch: Dispatch) => {
    await dispatch(request(devSheetID));

    //Call Service function
    await setDevelopmentSheetService(devSheetID).then(
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
  //Request with DevelopmentSheet ID and the Username of Trainer
  const request = (devSheetId, trainerUsername) => {
    return {
      type: traineeDevelopmentFormConstants.GETFULLDEVSHEET_REQUEST,
      devSheetId,
      trainerUsername
    };
  };

  //Success should return an DevelopmentSheet with any details
  const success = (devSheet: FullDevSheetFetch) => {
    return { type: traineeDevelopmentFormConstants.GETFULLDEVSHEET_SUCCESS, devSheet };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: traineeDevelopmentFormConstants.GETFULLDEVSHEET_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(devSheetId, trainerUsername));

    //Call Service function
    getFullDevSheetAsTraineeService(devSheetId, trainerUsername).then(
      devSheet => dispatch(success(devSheet)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};
