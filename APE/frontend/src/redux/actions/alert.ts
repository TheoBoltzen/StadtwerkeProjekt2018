import {alertConstants} from "../../constants";


export const successAlert = (msg: String) => {
    return {type: alertConstants.SUCCESS, msg}
}

export const errorAlert = (msg: String) => {
    return {type: alertConstants.ERROR, msg}
}

export const clearAlert = () => {
    return {type: alertConstants.CLEAR}
}
