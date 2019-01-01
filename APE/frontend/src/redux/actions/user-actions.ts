import { RoleConstants, RouterPathsConstants, userConstants } from "../../constants";
import {
  createUserService,
  getAllService,
  getRoleService,
  loginService,
  logoutService
} from "../../services";
import { history } from "../../helpers";
import { errorAlert, successAlert } from "./alert";
import { Dispatch } from "redux";
import { User } from "../../types";

export const login = (username: string, password: string) => {
  const request = (user: { username: string }) => {
    return { type: userConstants.LOGIN_REQUEST, user };
  };

  const success = (user: User) => {
    return { type: userConstants.LOGIN_SUCCESS, user };
  };

  const failure = (error: string) => {
    return { type: userConstants.LOGIN_FAILURE, error };
  };

  const requestRole = (token: string) => {
    return { type: userConstants.GETROLE_REQUEST, token };
  };

  const successRole = (role: string) => {
    return { type: userConstants.GETROLE_SUCESS, role };
  };

  const failureRole = (error: string) => {
    return { type: userConstants.GETROLE_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request({ username }));

    loginService(username, password).then(
      user => {
        dispatch(success(user));
        dispatch(requestRole(user.token));

        history.push("/");

        getRoleService(user.token).then(
          role => {
            dispatch(successRole(role));
            if (role === RoleConstants.admin) {
              history.push(RouterPathsConstants.userAdministration);
            }
            if (role === RoleConstants.trainer) {
              history.push(RouterPathsConstants.trainees);
            }
            if (role === RoleConstants.trainee) {
              history.push(RouterPathsConstants.traineeDevelopmentForms);
            }
          },
          error => {
            dispatch(failureRole(error.toString()));
            dispatch(errorAlert(error.toString()));
          }
        );
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

export const getRole = (token: string) => {
  const request = (token: string) => {
    return { type: userConstants.GETROLE_REQUEST, token };
  };

  const success = (role: string) => {
    return { type: userConstants.GETROLE_SUCESS, role };
  };

  const failure = (error: string) => {
    return { type: userConstants.GETROLE_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(token));

    getRoleService(token).then(
      role => {
        dispatch(success(role));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

export const getAll = () => {
  const request = () => {
    return { type: userConstants.GETALL_REQUEST };
  };

  const success = (users: User[]) => {
    return { type: userConstants.GETALL_SUCCESS, users };
  };

  const failure = (error: string) => {
    return { type: userConstants.GETALL_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request());

    getAllService().then(
      users => dispatch(success(users)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};

export const createUser = (
  username: string,
  password: string,
  firstname: string,
  lastname: string,
  role: string
) => {
  const request = () => {
    return { type: userConstants.CREATE_REQUEST };
  };

  const success = () => {
    return { type: userConstants.CREATE_SUCCESS };
  };

  const failure = (error: string) => {
    return { type: userConstants.CREATE_FAILURE, error };
  };

  return async (dispatch: Dispatch) => {
    await dispatch(request());

    await createUserService(username, password, firstname, lastname, role).then(
      () => {
        dispatch(success());
        dispatch(successAlert("Benutzer erfolgreich erstellt"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
};
