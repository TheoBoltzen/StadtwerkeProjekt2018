import { authHeader, handleResponse } from "./user-services";
import { apiURL } from "../constants";

export const getTraineeDevelopmentSheetsList = (TraineeUsername: string) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ TraineeUsername: TraineeUsername })
  } as RequestInit;

  return fetch(
    `${apiURL}/services/getAllUserDevelopmentSheetsByUserTraineeForList`,
    requestOptions
  ).then(handleResponse);
};
