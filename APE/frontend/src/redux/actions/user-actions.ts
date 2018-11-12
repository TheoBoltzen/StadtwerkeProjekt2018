import { userConstants } from "../../constants";
import { getAllService, loginService, logoutService } from "../../services";
import { history } from "../../helpers";
import { errorAlert } from "./alert";

export const login = (username: any, password: any) => {
  //TODO: Remove any
  return (dispatch: any) => {
    //TODO: Remove any
    dispatch(request({ username }));

    loginService(username, password).then(
      user => {
        dispatch(success(user));
        history.push("/");
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };

  const request = (user: any) => {
    //TODO: Remove any
    return { type: userConstants.LOGIN_REQUEST, user };
  };

  const success = (user: any) => {
    //TODO: Remove any
    return { type: userConstants.LOGIN_SUCCESS, user };
  };

  const failure = (error: any) => {
    //TODO: Remove any
    return { type: userConstants.LOGIN_FAILURE, error };
  };
};

export const logout = () => {
  logoutService();
  return { type: userConstants.LOGOUT };
};

export const getAll = () => {
  return (dispatch: any) => {
    //TODO: Remove any
    dispatch(request());

    getAllService().then(
      users => dispatch(success(users)),
      error => dispatch(failure(error))
    );
  };

  const request = () => {
    return { type: userConstants.GETALL_REQUEST };
  };

  const success = (users: any) => {
    //TODO: Remove any
    return { type: userConstants.GETALL_SUCCESS, users };
  };

  const failure = (error: any) => {
    //TODO: Remove any
    return { type: userConstants.GETALL_FAILURE, error };
  };
};
