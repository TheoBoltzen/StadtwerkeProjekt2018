import { authHeader, handleResponse } from "./user-services";
import { apiURL } from "../constants";
import { DevelopmentFormCreate } from "../types";

export const getAllService = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  } as RequestInit;

  return fetch(`${apiURL}/services/getAllDevelopmentSheets`, requestOptions).then(handleResponse);
};

export const getAllCompetencesService = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  } as RequestInit;

  return fetch(`${apiURL}/services/getAllCompetencyCategories`, requestOptions).then(
    handleResponse
  );
};

export const getAllMainCategoriesService = (competenceName: string) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ name: competenceName })
  } as RequestInit;

  return fetch(`${apiURL}/services/getMainCategoriesByCompetencyCategory`, requestOptions).then(
    handleResponse
  );
};

export const getAllSubCategoriesService = (mainCategoryName: string) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ name: mainCategoryName })
  } as RequestInit;

  return fetch(`${apiURL}/services/getSubCategoriesByMainCategory`, requestOptions).then(
    handleResponse
  );
};

export const getAllCriteriaService = (subCategoryName: string) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ name: subCategoryName })
  } as RequestInit;

  return fetch(`${apiURL}/services/getCompetencesBySubCategory`, requestOptions).then(
    handleResponse
  );
};

export const createDevelopmentSheetService = (developmenSheet: DevelopmentFormCreate) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ developmenSheet })
  } as RequestInit;

  return fetch(`${apiURL}/services/createReadyDevelopmentSheet`, requestOptions).then(
    handleResponse
  );
};
