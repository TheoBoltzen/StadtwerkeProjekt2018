import { authHeader, handleResponse } from "./user-services";
import { apiURL } from "../constants";

export const setDevelopmentSheetService = (devSheetID: string) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ DevelopmentSheetId: devSheetID })
  } as RequestInit;

  return fetch(`${apiURL}/services/setTraineeToUserDevSheet`, requestOptions).then(handleResponse);
};
