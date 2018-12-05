import { Action } from "redux";
import { CompetenceFetch } from "../../types";
import { developmentFormConstants } from "../../constants";

interface ActionSingleDevelopmentForm extends Action {
  competences: CompetenceFetch[];
  error: string;
}

export interface SingleDevelopmentFormReducer {
  readonly loading: boolean;
  readonly competences: CompetenceFetch[];
  readonly error: string;
}

const initialState: SingleDevelopmentFormReducer = {
  loading: false,
  competences: [],
  error: ""
};

export const singleDevelopmentFormReducer = (
  state = initialState,
  action: ActionSingleDevelopmentForm
) => {
  switch (action.type) {
    case developmentFormConstants.GETALLCOMPETENCES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case developmentFormConstants.GETALLCOMPETENCES_SUCCESS:
      return {
        ...state,
        competences: action.competences
      };
    case developmentFormConstants.GETALLCOMPETENCES_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
