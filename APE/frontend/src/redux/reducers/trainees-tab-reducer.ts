import { Action } from "redux";
import { ConnectedDevSheetFetch, FullDevSheetFetch, Trainee } from "../../types";
import { traineeTabConstants, trainerDevelopmentFormConstants } from "../../constants";

interface ActionTraineesTabReducer extends Action {
  trainees: Trainee[];
  connectedDevSheets: ConnectedDevSheetFetch[];
  devSheet: FullDevSheetFetch;
}

export interface TraineesTabReducer {
  readonly loading: boolean;
  readonly loadingFullDevSheet: boolean;
  readonly trainees: Trainee[];
  readonly devSheet: FullDevSheetFetch;
  readonly connectedDevSheets: ConnectedDevSheetFetch[];
}

const initialState: TraineesTabReducer = {
  loading: false,
  loadingFullDevSheet: false,
  devSheet: {
    result: {
      devSheetid: "",
      department: "",
      education: "",
      status: "",
      version: 0,
      trainee: "",
      trainer: "",
      content: []
    }
  },
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

    case trainerDevelopmentFormConstants.SETDEVSHEET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case trainerDevelopmentFormConstants.SETDEVSHEET_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case trainerDevelopmentFormConstants.SETDEVSHEET_FAILURE:
      return {
        ...state
      };

    case trainerDevelopmentFormConstants.GETFULLDEVSHEET_REQUEST:
      return {
        ...state,
        loadingFullDevSheet: true
      };
    case trainerDevelopmentFormConstants.GETFULLDEVSHEET_SUCCESS:
      return {
        ...state,
        loadingFullDevSheet: false,
        devSheet: action.devSheet
      };
    case trainerDevelopmentFormConstants.GETFULLDEVSHEET_FAILURE:
      return {
        ...state,
        loadingFullDevSheet: false
      };

    default:
      return state;
  }
};
