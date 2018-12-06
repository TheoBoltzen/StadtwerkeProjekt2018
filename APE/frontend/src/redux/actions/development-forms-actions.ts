import { developmentFormConstants } from "../../constants";
import { CompetenceFetch, DevelopmentForm, MainCategoryFetch, SubCategoryFetch } from "../../types";
import { Dispatch } from "redux";
import {
  getAllCompetencesService,
  getAllMainCategoriesService,
  getAllService
} from "../../services/development-forms-services";
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

export const getAllMainCategories = (competenceName: string) => {
  const request = competenceName => {
    return { type: developmentFormConstants.GETALLMAINCATEGORIES_REQUEST, competenceName };
  };

  const success = (mainCategories: MainCategoryFetch[]) => {
    return { type: developmentFormConstants.GETALLMAINCATEGORIES_SUCCESS, mainCategories };
  };

  const failure = (error: string) => {
    return { type: developmentFormConstants.GETALLMAINCATEGORIES_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(competenceName));

    getAllMainCategoriesService(competenceName).then(
      mainCategories => dispatch(success(mainCategories)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

export const getAllSubCategories = (mainCategoryName: string) => {
  const request = mainCategoryName => {
    return { type: developmentFormConstants.GETALLSUBCATEGORIES_REQUEST, mainCategoryName };
  };

  const success = (subCategories: SubCategoryFetch[]) => {
    return { type: developmentFormConstants.GETALLSUBCATEGORIES_SUCCESS, subCategories };
  };

  const failure = (error: string) => {
    return { type: developmentFormConstants.GETALLSUBCATEGORIES_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(mainCategoryName));

    getAllMainCategoriesService(mainCategoryName).then(
      subCategories => dispatch(success(subCategories)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};
