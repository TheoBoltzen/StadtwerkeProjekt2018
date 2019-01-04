import { Action } from "redux";
import { ConnectedDevSheetFetch, Trainee } from "../../types";
import { traineeTabConstants, trainerDevelopmentFormConstants } from "../../constants";

interface ActionTraineesTabReducer extends Action {
  trainees: Trainee[];
  connectedDevSheets: ConnectedDevSheetFetch[];
}

export interface TraineesTabReducer {
  readonly loading: boolean;
  readonly trainees: Trainee[];
  readonly connectedDevSheets: ConnectedDevSheetFetch[];
}

const initialState: TraineesTabReducer = {
  loading: false,
  trainees: [],
  connectedDevSheets: []
};

export const traineeTabReducer = (state = initialState, action: ActionTraineesTabReducer) => {
  switch (action.type) {
    case traineeTabConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case traineeTabConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        trainees: action.trainees
      };
    case traineeTabConstants.GETALL_FAILURE:
      return {
        ...state
      };

    case trainerDevelopmentFormConstants.GETALL_CONNECTEDDEVSHEETS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case trainerDevelopmentFormConstants.GETALL_CONNECTEDDEVSHEETS_SUCCESS:
      return {
        ...state,
        loading: false,
        connectedDevSheets: action.connectedDevSheets
      };
    case trainerDevelopmentFormConstants.GETALL_CONNECTEDDEVSHEETS_FAILURE:
      return {
        ...state
      };

    default:
      return state;
  }
};
