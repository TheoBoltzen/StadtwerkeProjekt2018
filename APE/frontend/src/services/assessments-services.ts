import { authHeader, handleResponse } from "./user-services";
import { apiURL } from "../constants";
import { TraineesAssessments, TrainerAssessments } from "../types";

export const setTrainerAssessmentService = (trainerAssessments: TrainerAssessments[]) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ trainerAssessments: trainerAssessments })
  } as RequestInit;

  return fetch(`${apiURL}/services/setTrainerAssessment`, requestOptions).then(handleResponse);
};

export const setTraineeAssessmentService = (traineeAssessments: TraineesAssessments[]) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ traineeAssessments: traineeAssessments })
  } as RequestInit;

  return fetch(`${apiURL}/services/setTraineeAssessment`, requestOptions).then(handleResponse);
};
