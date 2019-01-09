import { authHeader, handleResponse } from "./user-services";
import { apiURL } from "../constants";
import { TraineesAssessments } from "../types";

export const setDevelopmentSheetService = (devSheetID: string) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ DevelopmentSheetId: devSheetID })
  } as RequestInit;

  return fetch(`${apiURL}/services/setTraineeToUserDevSheet`, requestOptions).then(handleResponse);
};

export const setTraineeAssessmentService = (traineeAssessments: TraineesAssessments[]) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ traineeAssessments: traineeAssessments })
  } as RequestInit;

  return fetch(`${apiURL}/services/setTraineeAssessment`, requestOptions).then(handleResponse);
};
