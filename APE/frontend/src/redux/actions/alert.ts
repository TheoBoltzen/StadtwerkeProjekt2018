import {alertConstants} from "../../constants";


export const success = (msg: String) => {
    return {type: alertConstants.SUCCESS, msg}
}

export const error = (msg: String) => {
    return {type: alertConstants.ERROR, msg}
}

export const clear = () => {
    return {type: alertConstants.CLEAR}
}
