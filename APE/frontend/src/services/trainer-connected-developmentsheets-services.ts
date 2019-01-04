import { authHeader, handleResponse } from "./user-services";
import { apiURL } from "../constants";

export const setTrainerToTraineeDevelopmentSheetService = (
  traineeUsername: string,
  devSheetID: string
) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ TraineeUsername: traineeUsername, DevelopmentSheetId: devSheetID })
  } as RequestInit;

  return fetch(`${apiURL}/services/setTrainerToUserDevSheet`, requestOptions).then(handleResponse);
};

export const getAllConnectedDevelopmentSheetsService = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  } as RequestInit;

  return fetch(`${apiURL}/services/getAllUserDevelopmentSheetsForList`, requestOptions).then(
    handleResponse
  );
};
