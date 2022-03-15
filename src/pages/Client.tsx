import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { useNavigate } from "react-router-dom";
import { AuthState } from "../store/authReducer";
import { CarState } from "../store/carReducer";
import AddUserData from "../components/AddUserData";
import AddCar from "../components/AddCar"
import { useIsAuthenticated } from "@azure/msal-react";
import { authenticationModule } from "..";

const Client = () => {
  const isLoggedIn = useSelector(
    (state: { carReducer: CarState; authReducer: AuthState }) =>
      state.authReducer.isAuthenticated
  );
  function hasOwnProperty<X extends {}, Y extends PropertyKey>
  (obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)}

  const isAuthenticated = useIsAuthenticated();
  const claims  = authenticationModule.getUserClaims()

  const isAdmin = claims.includes("admin");
  if(isAdmin) authenticationModule.setAdmin();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("login");
    }
  }, []);

  return (
    <React.Fragment>
      <div className="flex-col flex-j-between flex-a-center flex-ac-center m-0 mt-100 pt-50">
        {isAdmin ? <AddCar/> : <AddUserData/>}
      </div>
    </React.Fragment>
  );
};

export default Client;
