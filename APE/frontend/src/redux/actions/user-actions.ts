import { userConstants } from "../../constants";
import { loginService, logoutService } from "../../services";
import { history } from "../../helpers";
import { errorAlert } from "./alert";
import { Dispatch } from "redux";
import { User } from "../../types";

export const login = (username: string, password: string) => {
  const request = (user: { username: string }) => {
    return { type: userConstants.LOGIN_REQUEST, user };
  };

  const success = (user: User) => {
    //TODO: Remove any
    return { type: userConstants.LOGIN_SUCCESS, user };
  };

  const failure = (error: string) => {
    return { type: userConstants.LOGIN_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
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
};

export const logout = () => {
  logoutService();
  return { type: userConstants.LOGOUT };
};

// export const getAll = () => {
//   const request = () => {
//     return { type: userConstants.GETALL_REQUEST };
//   };
//
//   const success = (users: any) => {
//     //TODO: Remove any
//     return { type: userConstants.GETALL_SUCCESS, users };
//   };
//
//   const failure = (error: any) => {
//     //TODO: Remove any
//     return { type: userConstants.GETALL_FAILURE, error };
//   };
//
//   return (dispatch: any) => {
//     //TODO: Remove any
//     dispatch(request());
//
//     getAllService().then(
//       users => dispatch(success(users)),
//       error => dispatch(failure(error))
//     );
//   };
// };
