import { Action } from "redux";
import { DevelopmentForm, EmptyDevSheetFetch } from "../../types";
import { developmentFormConstants } from "../../constants";

/** Interface declaration of action **/
interface ActionDevelopmentForm extends Action {
  developmentForms: DevelopmentForm[];
  developmentFormDetail: EmptyDevSheetFetch;
}

/** Interface declaration of state **/
export interface DevelopmentFormsReducer {
  readonly loading: boolean;
  readonly developmentForms: DevelopmentForm[];
  readonly developmentFormDetail: EmptyDevSheetFetch;
}

//Set initial state
const initialState: DevelopmentFormsReducer = {
  loading: false,
  developmentForms: [],
  developmentFormDetail: {
    result: {
      devSheetid: "",
      department: "",
      education: "",
      version: 0,
      content: []
    }
  }
};

export const developmentFormsReducer = (state = initialState, action: ActionDevelopmentForm) => {
  switch (action.type) {
    case developmentFormConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case developmentFormConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        developmentForms: action.developmentForms
      };
    case developmentFormConstants.GETALL_FAILURE:
      return {
        ...state
      };

    case developmentFormConstants.GETDETAILDEVELOPMENTSHEET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case developmentFormConstants.GETDETAILDEVELOPMENTSHEET_SUCCESS:
      return {
        ...state,
        loading: false,
        developmentFormDetail: action.developmentFormDetail
      };
    case developmentFormConstants.GETDETAILDEVELOPMENTSHEET_FAILURE:
      return {
        ...state
      };

    default:
      return state;
  }
};
