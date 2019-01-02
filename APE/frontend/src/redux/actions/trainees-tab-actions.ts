import { traineeTabConstants } from "../../constants";
import { Trainee } from "../../types";
import { Dispatch } from "redux";
import { getAllTraineesService } from "../../services";
import { errorAlert } from "./alert";

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
