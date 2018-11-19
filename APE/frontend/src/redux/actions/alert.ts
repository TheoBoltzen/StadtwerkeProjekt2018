import { alertConstants } from "../../constants";

export const successAlert = (msg: string) => {
  return { type: alertConstants.SUCCESS, message: msg };
};

export const errorAlert = (msg: string) => {
  return { type: alertConstants.ERROR, message: msg };
};

export const clearAlert = () => {
  return { type: alertConstants.CLEAR };
};
