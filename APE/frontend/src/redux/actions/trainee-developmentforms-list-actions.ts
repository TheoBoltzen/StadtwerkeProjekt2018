import { traineeDevFormListConstants } from "../../constants";
import { Dispatch } from "redux";
import { errorAlert } from "./alert";
import { getTraineeDevelopmentSheetsList } from "../../services";

export const getTraineeDevelopmentSheetList = (username: string) => {
  const request = username => {
    return { type: traineeDevFormListConstants.GETALL_REQUEST, username }; //
  };

  const success = () => {
    return { type: traineeDevFormListConstants.GETALL_SUCCESS };
  };

  const failure = (error: string) => {
    return { type: traineeDevFormListConstants.GETALL_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(username));

    getTraineeDevelopmentSheetsList(username).then(
      () => dispatch(success()),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};
