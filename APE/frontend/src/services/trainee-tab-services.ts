import { authHeader, handleResponse } from "./user-services";
import { apiURL } from "../constants";

export const getAllTraineesService = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  } as RequestInit;

  return fetch(`${apiURL}/services/getAllTrainees`, requestOptions).then(handleResponse);
};
