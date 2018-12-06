import { authHeader, handleResponse } from "./user-services";
import { apiURL } from "../constants";

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
    body: JSON.stringify({ competenceName })
  } as RequestInit;

  return fetch(`${apiURL}/services/getMainCategoriesByCompetencyCategory`, requestOptions).then(
    handleResponse
  );
};
