import { traineeDevelopmentFormConstants } from "../../constants";
import { Dispatch } from "redux";
import { errorAlert } from "./alert";
import { setDevelopmentSheet } from "../../services";

export const setTraineeDevelopmentSheet = (username: string, devSheetID: string) => {
  const request = (username, devSheetID) => {
    return { type: traineeDevelopmentFormConstants.SETDEVSHEET_REQUEST, username, devSheetID }; //
  };

  const success = () => {
    return { type: traineeDevelopmentFormConstants.SETDEVSHEET_SUCCESS };
  };

  const failure = (error: string) => {
    return { type: traineeDevelopmentFormConstants.SETDEVSHEET_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(username, devSheetID));

    setDevelopmentSheet(username, devSheetID).then(
      () => dispatch(success()),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};
