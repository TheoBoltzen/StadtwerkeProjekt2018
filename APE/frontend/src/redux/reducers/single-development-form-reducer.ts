import { Action } from "redux";
import { CompetenceFetch, MainCategoryFetch } from "../../types";
import { developmentFormConstants } from "../../constants";

interface ActionSingleDevelopmentForm extends Action {
  competences: CompetenceFetch[];
  mainCategories: MainCategoryFetch[];
  error: string;
}

export interface SingleDevelopmentFormReducer {
  readonly loading: boolean;
  readonly competences: CompetenceFetch[];
  readonly mainCategories: MainCategoryFetch[];
  readonly error: string;
}

const initialState: SingleDevelopmentFormReducer = {
  loading: false,
  competences: [],
  mainCategories: [],
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
        competences: action.competences,
        loading: false
      };
    case developmentFormConstants.GETALLCOMPETENCES_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    case developmentFormConstants.GETALLMAINCATEGORIES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case developmentFormConstants.GETALLMAINCATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        mainCategories: action.mainCategories
      };
    case developmentFormConstants.GETALLMAINCATEGORIES_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    default:
      return state;
  }
};
