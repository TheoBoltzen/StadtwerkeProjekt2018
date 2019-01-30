import { developmentFormConstants } from "../../constants";
import {
  CompetenceFetch,
  CriteriaFetch,
  DevelopmentForm,
  DevelopmentFormCreate,
  EmptyDevSheetFetch,
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
  getAllSubCategoriesService,
  getDetailDevelopmentSheetService
} from "../../services/development-forms-services";
import { errorAlert } from "./alert";

//Action to get all DevelopmentSheet Parameters
export const getAll = () => {
  //Request without any parameter
  const request = () => {
    return { type: developmentFormConstants.GETALL_REQUEST };
  };

  //Success should return DevelopmentSheet
  const success = (developmentForms: DevelopmentForm[]) => {
    return { type: developmentFormConstants.GETALL_SUCCESS, developmentForms };
  };

  //Failure should return an error
  const failure = (error: any) => {
    return { type: developmentFormConstants.GETALL_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request());

    //Call Service function
    getAllService().then(
      devForms => dispatch(success(devForms)),
      error => dispatch(failure(error))
    );
  };
};

//Action to get all competences
export const getAllCompetences = () => {
  //Request without any parameter
  const request = () => {
    return { type: developmentFormConstants.GETALLCOMPETENCES_REQUEST };
  };

  //Success should return all competences
  const success = (competences: CompetenceFetch[]) => {
    return { type: developmentFormConstants.GETALLCOMPETENCES_SUCCESS, competences };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: developmentFormConstants.GETALLCOMPETENCES_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request());

    //Call Service function
    getAllCompetencesService().then(
      competences => dispatch(success(competences)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

//Action to get all MainCategories to specific Competence
export const getAllMainCategories = (competenceName: string) => {
  //Request with the competenceName
  const request = competenceName => {
    return { type: developmentFormConstants.GETALLMAINCATEGORIES_REQUEST, competenceName };
  };

  //Success should return all MainCategories inside the competence
  const success = (mainCategories: MainCategoryFetch[]) => {
    return { type: developmentFormConstants.GETALLMAINCATEGORIES_SUCCESS, mainCategories };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: developmentFormConstants.GETALLMAINCATEGORIES_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(competenceName));

    //Call Service function
    getAllMainCategoriesService(competenceName).then(
      mainCategories => dispatch(success(mainCategories)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

//Action to get all SubCategories to specific MainCategory
export const getAllSubCategories = (mainCategoryName: string) => {
  //Request with the MainCategoryName
  const request = mainCategoryName => {
    return { type: developmentFormConstants.GETALLSUBCATEGORIES_REQUEST, mainCategoryName };
  };

  //Success should return all SubCategories inside the MainCategory
  const success = (subCategories: SubCategoryFetch[]) => {
    return { type: developmentFormConstants.GETALLSUBCATEGORIES_SUCCESS, subCategories };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: developmentFormConstants.GETALLSUBCATEGORIES_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(mainCategoryName));

    //Call Service function
    getAllSubCategoriesService(mainCategoryName).then(
      subCategories => dispatch(success(subCategories)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

//Action to get all Criteria to specific SubCategory
export const getAllCriteria = (subCategoryName: string) => {
  //Request with the SubCategoryName
  const request = subCategoryName => {
    return { type: developmentFormConstants.GETALLCRITERIA_REQUEST, subCategoryName };
  };

  //Success should return all Criteria inside the SubCategory
  const success = (criteria: CriteriaFetch) => {
    return { type: developmentFormConstants.GETALLCRITERIA_SUCCESS, criteria };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: developmentFormConstants.GETALLCRITERIA_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(subCategoryName));

    //Call Service function
    getAllCriteriaService(subCategoryName).then(
      criteria => dispatch(success(criteria)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

//Action to create the DevelopmentSheet
export const createDevelopmenSheet = (developmenSheet: DevelopmentFormCreate) => {
  //Request with developmentSheet as Parameter (all Categories + Criteria with TargetValue)
  const request = developmenSheet => {
    return { type: developmentFormConstants.CREATEDEVELOPMENTSHEET_REQUEST, developmenSheet };
  };

  //Success without any returning values
  const success = () => {
    return { type: developmentFormConstants.CREATEDEVELOPMENTSHEET_SUCCESS };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: developmentFormConstants.CREATEDEVELOPMENTSHEET_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(developmenSheet));

    //Call Service function
    createDevelopmentSheetService(developmenSheet).then(
      () => dispatch(success()),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

//Action to get an empty DevelopmentSheet (not all information)
export const getDetailDevelopmentSheet = (id: string) => {
  //Request with DevelopmentSheet ID
  const request = id => {
    return { type: developmentFormConstants.GETDETAILDEVELOPMENTSHEET_REQUEST, id };
  };

  //Success should return a DevelopmentSheet
  const success = (developmentFormDetail: EmptyDevSheetFetch) => {
    return {
      type: developmentFormConstants.GETDETAILDEVELOPMENTSHEET_SUCCESS,
      developmentFormDetail
    };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: developmentFormConstants.GETDETAILDEVELOPMENTSHEET_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(id));

    //Call Service function
    getDetailDevelopmentSheetService(id).then(
      developmentFormDetail => dispatch(success(developmentFormDetail)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};
