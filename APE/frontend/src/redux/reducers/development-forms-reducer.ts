import {Action} from "redux";
import {DevelopmentForm} from "../../types";
import {developmentFormConstants} from "../../constants";


interface ActionDevelopmentForm extends Action {
    developmenForms: DevelopmentForm[];
}

export interface DevelopmentFormsReducer {
    readonly loading: boolean;
    readonly developmenForms: DevelopmentForm[];
}

const initialState: DevelopmentFormsReducer = {
    loading: false,
    developmenForms: []
};

export const developmentFormsReducer = (state = initialState, action: ActionDevelopmentForm) => {
    switch (action.type) {
        case developmentFormConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case developmentFormConstants.GETALL_SUCCESS:
            return {
                loading: false,
                developmenForms: action.developmenForms
            }
        case developmentFormConstants.GETALL_FAILURE:
            return {
                ...state
            }
        default:
            return state
    }
}