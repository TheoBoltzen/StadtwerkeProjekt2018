import { authHeader, handleResponse } from "./user-services";
import { apiURL } from "../constants";

export const setDevelopmentSheet = (username: string, devSheetID: string) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ username: username, DevelopmentSheetId: devSheetID })
  } as RequestInit;

  return fetch(`${apiURL}/services/setTraineeToUserDevSheet`, requestOptions).then(handleResponse);
};
