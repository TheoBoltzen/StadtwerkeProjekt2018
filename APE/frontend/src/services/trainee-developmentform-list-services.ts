import { authHeader, handleResponse } from "./user-services";
import { apiURL } from "../constants";

export const getTraineeDevelopmentSheetsList = (username: string) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ username: username })
  } as RequestInit;

  return fetch(
    `${apiURL}/services/getAllUserDevelopmentSheetsByUserTraineeForList`,
    requestOptions
  ).then(handleResponse);
};
