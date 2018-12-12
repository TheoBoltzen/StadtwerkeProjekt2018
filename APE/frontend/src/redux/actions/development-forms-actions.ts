import { developmentFormConstants } from "../../constants";
import {
  CompetenceFetch,
  CriteriaFetch,
  DevelopmentForm,
  DevelopmentFormCreate,
  MainCategoryFetch,
  SubCategoryFetch
} from "../../types";
import { Dispatch } from "redux";
import {
  createDevelopmentSheetService,
  getAllCompetencesService,
  getAllCriteriaService,
  getAllMainCategoriesService,
  getAllService,
  getAllSubCategoriesService
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

    getAllSubCategoriesService(mainCategoryName).then(
      subCategories => dispatch(success(subCategories)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

export const getAllCriteria = (subCategoryName: string) => {
  const request = subCategoryName => {
    return { type: developmentFormConstants.GETALLCRITERIA_REQUEST, subCategoryName };
  };

  const success = (criteria: CriteriaFetch) => {
    return { type: developmentFormConstants.GETALLCRITERIA_SUCCESS, criteria };
  };

  const failure = (error: string) => {
    return { type: developmentFormConstants.GETALLCRITERIA_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(subCategoryName));

    getAllCriteriaService(subCategoryName).then(
      criteria => dispatch(success(criteria)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

export const createDevelopmenSheet = (developmenSheet: DevelopmentFormCreate) => {
  const request = developmenSheet => {
    return { type: developmentFormConstants.CREATEDEVELOPMENTSHEET_REQUEST, developmenSheet };
  };

  const success = () => {
    return { type: developmentFormConstants.CREATEDEVELOPMENTSHEET_SUCCESS };
  };

  const failure = (error: string) => {
    return { type: developmentFormConstants.CREATEDEVELOPMENTSHEET_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(developmenSheet));

    createDevelopmentSheetService(developmenSheet).then(
      () => dispatch(success()),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};
