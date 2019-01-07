import { authHeader, handleResponse } from "./user-services";
import { apiURL } from "../constants";

export const getAllTraineesService = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  } as RequestInit;

  return fetch(`${apiURL}/services/getAllTrainees`, requestOptions).then(handleResponse);
};

export const getFullDevSheetAsTraineeService = (devSheetId: number, trainerUsername: string) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ id: devSheetId, trainer: trainerUsername })
  } as RequestInit;

  return fetch(`${apiURL}/services/getfullDevSheetTrainee`, requestOptions).then(handleResponse);
};
