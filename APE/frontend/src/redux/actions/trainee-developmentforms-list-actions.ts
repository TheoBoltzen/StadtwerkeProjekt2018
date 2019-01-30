import { traineeDevFormListConstants } from "../../constants";
import { Dispatch } from "redux";
import { errorAlert } from "./alert";
import { getTraineeDevelopmentSheetsList } from "../../services";
import { DevelopmentFormsListTrainee } from "../../types";

//Action to get all DevelopmentSheets for a trainee
export const getTraineeDevelopmentSheetList = () => {
  //Request without any parameter
  const request = () => {
    return { type: traineeDevFormListConstants.GETALL_REQUEST }; //
  };

  //Success should return an array of DevelopmentSheets
  const success = (traineeDevelopmentFormsList: DevelopmentFormsListTrainee[]) => {
    return { type: traineeDevFormListConstants.GETALL_SUCCESS, traineeDevelopmentFormsList };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: traineeDevFormListConstants.GETALL_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request());

    //Call Service function
    getTraineeDevelopmentSheetsList().then(
      developmentListTrainee => dispatch(success(developmentListTrainee)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};
