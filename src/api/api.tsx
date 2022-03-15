import { AccountInfo } from "@azure/msal-browser";
import axios from "axios";
import qs from "qs";
import { authenticationModule } from "..";
import { Car, dummyCar, dummyUser, userData } from "../data/Car";
import { set } from "../store/carReducer";
import { axiosAuth } from "./config";

const GroupApiURL = "https://backenddotnetmini.azurewebsites.net/"; //"https://localhost:7092/";//

// export enum CompanyType {
//   OUR,
//   BOSS,
//   OTHER,
// }

export const CompanyType = {
  OUR: "Our Company",
  BOSS: "Boss Company",
  OTHER: "Other Company",
};

export const authHeader: () => string = () => {
  const userSecret = sessionStorage.getItem("secret");
  console.log(userSecret);

  return "124";
};

export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  const expires_in = localStorage.getItem("expires_in");
  if (token && expires_in) {
    console.log(token);
    console.log(expires_in);
    if (Date.now() < parseInt(expires_in)) {
      console.log("Token is valid");
      return true;
    }
  }
  console.log("Token expired");
  return false;
};

export const getCarPrice = (
  id: string,
  company: string,
  days: number,
  car: Car
) => {
  console.log(company);
  return axios({
    method: "post",
    url: GroupApiURL + `car/${car.brandName}/${car.modelName}/price`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      microsoftId: id,
      companyName: company,
      rentDuration: days,
    }),
  });
  // .then((response) => {return response})
  // .catch((error) => {console.log(error); throw error});
};

export const getCarPriceById = (
  company: string = CompanyType.BOSS,
  car: Car = dummyCar,
  user: any = dummyUser,
  days: number = 1
) => {
  return axios({
    method: "post",
    url: GroupApiURL + `car/${car.id}/price`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      microsoftId: authenticationModule.getUserId(),
      rentDuration: days,
      companyName: company,
    }),
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

export const getToken = async () => {
  var authorizationBasic = window.btoa(
    "team1b" + ":" + "490f00bb-467b-43e4-a3bd-7b2b85c3ddb2"
  );

  await axiosAuth({
    method: "post",
    url: "/connect/token",
    headers: {
      Authorization: "Basic " + authorizationBasic,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify({
      grant_type: "client_credentials",
    }),
  })
    .then((response) => response.data)
    .then((data) => {
      console.log(data);
      if (data.access_token) {
        let date = Date.now();
        date += data.expires_in * 1000;
        console.log(data.access_token);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("expires_in", date.toString());
        console.log(date.toString());
        localStorage.setItem("token_type", data.token_type);
      }
    })
    .catch((error) => console.log(error));
};

export const getCars = (dispatch: any) => {
  return axios
    .get(GroupApiURL + "car/list")
    .then((response) => {
      console.log(response);
      dispatch(
        set({
          data: response.data,
        })
      );
    })
    .catch((error) => console.log(error));
};

export const getAllCars = async (dispatch: any, getState: Car[]) => {
  if (!isTokenValid) getToken();
  getCars(dispatch);
};

export const rentCar = (id: string, quoteId: string, date: Date) => {
  return axios({
    method: "post",
    url: GroupApiURL + `car/rent/${quoteId}`,
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      id: id,
    },
    data: JSON.stringify({
      startDate: date.toISOString(),
    }),
  })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const returnCar = (rentId: string) => {
  return axios
    .post(GroupApiURL + `car/return/${rentId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const addCar = (car: Car) => {
  return axios({
    method: "post",
    url: GroupApiURL + `car/add`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      imageUrl: "https://www.freeiconspng.com/uploads/car-png-27.png",
      brandName: car.brandName,
      modelName: car.modelName,
      year: car.year,
      enginePower: car.enginePower,
      enginePowerType: car.enginePowerType,
      capacity: car.capacity,
      description: car.description,
      price: 100,
      currency: "USD",
    }),
  })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const registerUser = (user: userData) => {
  return axios({
    method: "post",
    url: GroupApiURL + `user/register`,
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      microsoftID: user.id,
      yearOfGettingDriverLicence: user.yearOfGettingDriverLicence.getFullYear(),
      yearOfBirth: user.birthDate.getFullYear(),
      city: user.city,
      country: user.country,
      email: user.emailAddress,
    }),
  })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const getRented = (id: string) => {
  return axios({
    method: "get",
    url: GroupApiURL + `car/rented`,
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      id: id,
    },
  })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const getHistory = (id: string) => {
  return axios({
    method: "get",
    url: GroupApiURL + `car/history`,
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      id: id,
    },
  })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const getAllRented = () => {
  return axios({
    method: "get",
    url: GroupApiURL + `car/rented/all/rented`,
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const getAllHistory = () => {
  return axios({
    method: "get",
    url: GroupApiURL + `car/rented/all/history`,
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
