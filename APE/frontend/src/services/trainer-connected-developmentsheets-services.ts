import { authHeader, handleResponse } from "./user-services";
import { apiURL } from "../constants";

export const setTrainerToTraineeDevelopmentSheet = (devSheetID: string) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ DevelopmentSheetId: devSheetID })
  } as RequestInit;

  return fetch(`${apiURL}/services/setTrainerToUserDevSheet`, requestOptions).then(handleResponse);
};

export const getAllConnectedDevelopmentSheets = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  } as RequestInit;

  return fetch(`${apiURL}/services/getAllUserDevelopmentSheetsForList`, requestOptions).then(
    handleResponse
  );
};
