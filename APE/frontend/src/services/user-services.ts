import { apiURL } from "../constants";
import { User } from "../types";

// const authHeader = () => {
//   //returns header with jwt token
//   let user = JSON.parse(localStorage.getItem("user") as any); //TODO: Remove any
//
//   if (user && user.token) {
//     return { Authorization: user.token };
//   } else {
//     return {};
//   }
// };

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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  };

  return fetch(`${apiURL}/role`, requestOptions).then(handleResponseRole);
};

export const logoutService = () => {
  localStorage.removeItem("user");
};

// export const getAllService = () => {
//   const requestOptions: any = {
//     //TODO: Remove any
//     method: "GET",
//     headers: authHeader()
//   };
//
//   return fetch(`${apiURL}/users`, requestOptions).then(handleResponse);
// };
//
// export const getByIdService = (id: any) => {
//   //TODO: Remove any
//   const requestOptions: any = {
//     //TODO: Remove any
//     method: "GET",
//     headers: authHeader()
//   };
//
//   return fetch(`${apiURL}/users/${id}`, requestOptions).then(handleResponse);
// };
const handleResponseRole = (response: Response) => {
  return response.text().then((text: any) => {
    const data = text;
    if (!response.ok) {
      if (response.status === 401) {
        //auto logout
        logoutService();
        location.reload(true);
      }

      const error = data || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
};

const handleResponse = (response: Response) => {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if (response.status === 401) {
        //auto logout
        logoutService();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
};
