import { authHeader, handleResponse } from "./user-services";
import { apiURL } from "../constants";

export const getTraineeDevelopmentSheetsList = () => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({})
  } as RequestInit;

  return fetch(
    `${apiURL}/services/getAllUserDevelopmentSheetsByUserTraineeForList`,
    requestOptions
  ).then(handleResponse);
};
