import { developmentFormConstants } from "../../constants";
import { CompetenceFetch, DevelopmentForm } from "../../types";
import { Dispatch } from "redux";
import { getAllCompetencesService, getAllService } from "../../services/development-forms-services";
import { errorAlert } from "./alert";

export const getAll = () => {
  const request = () => {
    return { type: developmentFormConstants.GETALL_REQUEST };
  };

  const success = (developmentForms: DevelopmentForm[]) => {
    return { type: developmentFormConstants.GETALL_SUCCESS, developmentForms };
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

export const getAllCompetences = () => {
  const request = () => {
    return { type: developmentFormConstants.GETALLCOMPETENCES_REQUEST };
  };
  const success = (competences: CompetenceFetch[]) => {
    return { type: developmentFormConstants.GETALLCOMPETENCES_SUCCESS, competences };
  };

  const failure = (error: string) => {
    return { type: developmentFormConstants.GETALLCOMPETENCES_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request());

    getAllCompetencesService().then(
      competences => dispatch(success(competences)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};
