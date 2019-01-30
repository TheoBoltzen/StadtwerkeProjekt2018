import { alertConstants } from "../../constants";

//Alert actions
export const successAlert = (msg: string) => {
  return { type: alertConstants.SUCCESS, message: msg };
};

export const errorAlert = (msg: string) => {
  return { type: alertConstants.ERROR, message: msg };
};

export const clearAlert = () => {
  return { type: alertConstants.CLEAR };
};

export const saveAlert = () => {
  return { type: alertConstants.SAVE };
};
