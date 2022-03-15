import axios from "axios";
import { getToken } from "./api";

export const axiosAuth = axios.create();

axiosAuth.interceptors.request.use(
  (config) => {
    if (config.url && config.url && config.url !== "/connect/token") {
      if (!config.headers) config["headers"] = {};
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// axios.interceptors.response.use((response) => {
//   //console.log(response.config.url);
//   // Return a successful response back to the calling service
//   return response;
// },
// (error) => {
//   //console.log(error.response);
//   // Return any error which is not due to authentication back to the calling service
//   if (error.response.status !== 401) {
//     return new Promise((resolve, reject) => {
//       reject(error);
//     });
// }})
axiosAuth.interceptors.response.use(
  (response) => {
    //console.log(response.config.url);
    // Return a successful response back to the calling service
    return response;
  },
  (error) => {
    //console.log(error.response);
    // Return any error which is not due to authentication back to the calling service
    if (error.response.status !== 404) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    // Logout user if token refresh didn't work or user is disabled
    if (
      error.config.url == "/connect/token" ||
      error.response.message == "Account is disabled."
    ) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    //Try request again with new token
    return getToken()
      .then(() => {
        console.log(localStorage.getItem("token"));
        // New request with new token
        const config = error.config;
        config.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "token"
        )}`;

        return new Promise((resolve, reject) => {
          axiosAuth
            .request(config)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        });
      })
      .catch((error) => {
        Promise.reject(error);
      });
  }
);
