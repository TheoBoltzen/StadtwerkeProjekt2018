import { traineeDevelopmentFormConstants } from "../../constants";
import { Dispatch } from "redux";
import { errorAlert, successAlert } from "./alert";
import { setTraineeAssessmentService } from "../../services";
import { TraineesAssessments } from "../../types";

export const setTraineeAssessments = (
  devSheetID: string,
  traineeAssessments: TraineesAssessments[]
) => {
  const request = (devSheetID, traineeAssessments) => {
    return {
      type: traineeDevelopmentFormConstants.SETDASSESSMENT_REQUEST,
      devSheetID,
      traineeAssessments
    }; //
  };

  const success = () => {
    return { type: traineeDevelopmentFormConstants.SETDASSESSMENT_SUCCESS };
  };

  const failure = (error: string) => {
    return { type: traineeDevelopmentFormConstants.SETDASSESSMENT_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(devSheetID, traineeAssessments));

    setTraineeAssessmentService(devSheetID, traineeAssessments).then(
      () => {
        dispatch(success());
        dispatch(successAlert("Werte erfolgreich zugewiesen"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};
