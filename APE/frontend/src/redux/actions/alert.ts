import { alertConstants } from "../../constants";

export const successAlert = (msg: String) => {
  return { type: alertConstants.SUCCESS, message: msg };
};

export const errorAlert = (msg: String) => {
  return { type: alertConstants.ERROR, message: msg };
};

export const clearAlert = () => {
  return { type: alertConstants.CLEAR };
};