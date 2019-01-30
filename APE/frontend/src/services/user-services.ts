import { apiURL } from "../constants";
import { User } from "../types";

/** Header function with token **/
export const authHeader = () => {
  //returns header with jwt token
  let user = JSON.parse(localStorage.getItem("user") as any); //TODO: Remove any

  if (user && user.token) {
    const token = "Bearer " + user.token;
    return { "Content-Type": "application/json", Authorization: token, Pragma: "no-cache" };
  } else {
    return {};
  }
};

export const loginService = (username: string, password: string) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  };

  return fetch(`${apiURL}/services/authenticate`, requestOptions)
    .then(handleResponse)
    .then((user: User) => {
      if (user.token) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            token: user.token
          })
        );
      }

      return user;
    });
};

export const getRoleService = (token: string) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ token })
  } as RequestInit;

  return fetch(`${apiURL}/role`, requestOptions).then(handleResponse);
};

export const logoutService = () => {
  //Delete user item in localStorage
  localStorage.removeItem("user");
};

export const getAllService = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  } as RequestInit;

  return fetch(`${apiURL}/services/getAllUser`, requestOptions).then(handleResponse);
};

export const createUserService = (
  username: string,
  password: string,
  firstname: string,
  lastname: string,
  role: string,
  hiredOn: string,
  profession: string
) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ username, password, firstname, lastname, role, hiredOn, profession })
  } as RequestInit;

  return fetch(`${apiURL}/services/register`, requestOptions).then(handleResponse);
};

/** Function to handle incoming data from backend **/
export const handleResponse = (response: Response) => {
  return response.text().then((text: string) => {
    //Parse data to object
    const data = text && JSON.parse(text);

    if (!response.ok) {
      //Check if user is unauthorized
      if (response.status === 401) {
        //auto logout
        logoutService();
        location.reload(true);
      }

      //Fetch error
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
};
