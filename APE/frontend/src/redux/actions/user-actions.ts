import { userConstants } from "../../constants";
import { loginService, logoutService } from "../../services";
import { history } from "../../helpers";
import { errorAlert } from "./alert";
import { Dispatch } from "redux";

export const login = (username: string, password: string) => {
  const request = (user: any) => {
    //TODO: Remove any
    return { type: userConstants.LOGIN_REQUEST, user };
  };

  const success = (user: any) => {
    //TODO: Remove any
    return { type: userConstants.LOGIN_SUCCESS, user };
  };

  const failure = (error: any) => {
    console.log("error: ", error);
    //TODO: Remove any
    return { type: userConstants.LOGIN_FAILURE, error };
  };

  //TODO: Remove any
  return (dispatch: Dispatch) => {
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
