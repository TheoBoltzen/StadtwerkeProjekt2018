import { developmentFormConstants } from "../../constants";
import { DevelopmentForm } from "../../types";
import { Dispatch } from "redux";
import { getAllService } from "../../services/development-forms-services";

export const getAll = () => {
  const request = () => {
    return { type: developmentFormConstants.GETALL_REQUEST };
  };

  const success = (devForm: DevelopmentForm[]) => {
    return { type: developmentFormConstants.GETALL_SUCCESS, devForm };
  };

  const failure = (error: any) => {
    return { type: developmentFormConstants.GETALL_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request());

    getAllService().then(
      devForms => dispatch(success(devForms)),
      error => dispatch(failure(error))
    );
  };
};
