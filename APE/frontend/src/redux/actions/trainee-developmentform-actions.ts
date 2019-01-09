import { traineeDevelopmentFormConstants } from "../../constants";
import { Dispatch } from "redux";
import { errorAlert, successAlert } from "./alert";
import { setDevelopmentSheetService } from "../../services";

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
