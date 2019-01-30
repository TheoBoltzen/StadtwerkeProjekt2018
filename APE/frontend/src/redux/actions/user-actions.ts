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

//Action to login as a user
export const login = (username: string, password: string) => {
  //Request with a username
  const request = (user: { username: string }) => {
    return { type: userConstants.LOGIN_REQUEST, user };
  };

  //Success should return complete user
  const success = (user: User) => {
    return { type: userConstants.LOGIN_SUCCESS, user };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: userConstants.LOGIN_FAILURE, error };
  };

  //Request the role of user - Token as Parameter
  const requestRole = (token: string) => {
    return { type: userConstants.GETROLE_REQUEST, token };
  };

  //Success should return the role as a string
  const successRole = (role: string) => {
    return { type: userConstants.GETROLE_SUCESS, role };
  };

  //Failure shold return an error
  const failureRole = (error: string) => {
    return { type: userConstants.GETROLE_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request({ username }));

    //Call Service function to login
    loginService(username, password).then(
      user => {
        dispatch(success(user));
        dispatch(requestRole(user.token));

        //Redirect the user to the root path
        history.push("/");

        //Call Service function to get Role
        getRoleService(user.token).then(
          role => {
            dispatch(successRole(role));

            //Check which role user has and redirect the user to specific path
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

//Action to logout
export const logout = () => {
  //Call logout Service function
  logoutService();
  return { type: userConstants.LOGOUT };
};

//Action to get the role of the user
export const getRole = (token: string) => {
  //Request with token
  const request = (token: string) => {
    return { type: userConstants.GETROLE_REQUEST, token };
  };

  //Success should return the role of user
  const success = (role: string) => {
    return { type: userConstants.GETROLE_SUCESS, role };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: userConstants.GETROLE_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request(token));

    //Call Service function
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

//Action tol get all users
export const getAll = () => {
  //Request without any parameter
  const request = () => {
    return { type: userConstants.GETALL_REQUEST };
  };

  //Success should return an array with all users
  const success = (users: User[]) => {
    return { type: userConstants.GETALL_SUCCESS, users };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: userConstants.GETALL_FAILURE, error };
  };

  return (dispatch: Dispatch) => {
    dispatch(request());

    //Call Service function
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
  role: string,
  hiredOn: string,
  profession: string
) => {
  //Request with all user information
  const request = (username, password, firstname, lastname, role, hiredOn, profession) => {
    return {
      type: userConstants.CREATE_REQUEST,
      username,
      password,
      firstname,
      lastname,
      role,
      hiredOn,
      profession
    };
  };

  //Success without any returning values
  const success = () => {
    return { type: userConstants.CREATE_SUCCESS };
  };

  //Failure should return an error
  const failure = (error: string) => {
    return { type: userConstants.CREATE_FAILURE, error };
  };

  return async (dispatch: Dispatch) => {
    await dispatch(request(username, password, firstname, lastname, role, hiredOn, profession));

    //Call Service function
    await createUserService(
      username,
      password,
      firstname,
      lastname,
      role,
      hiredOn,
      profession
    ).then(
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
