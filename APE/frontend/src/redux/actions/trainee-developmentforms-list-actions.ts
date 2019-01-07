import { traineeDevFormListConstants } from "../../constants";
import { Dispatch } from "redux";
import { errorAlert } from "./alert";
import { getTraineeDevelopmentSheetsList } from "../../services";
import { DevelopmentFormsListTrainee } from "../../types";

export const getTraineeDevelopmentSheetList = (TraineeUsername: string) => {
  const request = TraineeUsername => {
    return { type: traineeDevFormListConstants.GETALL_REQUEST, TraineeUsername }; //
  };

  const success = (traineeDevelopmentFormsList: DevelopmentFormsListTrainee[]) => {
    return { type: traineeDevFormListConstants.GETALL_SUCCESS, traineeDevelopmentFormsList };
  };

  const failure = (error: string) => {
    return { type: traineeDevFormListConstants.GETALL_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(TraineeUsername));

    getTraineeDevelopmentSheetsList(TraineeUsername).then(
      developmentListTrainee => dispatch(success(developmentListTrainee)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};
