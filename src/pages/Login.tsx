import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logAsAdmin, login } from "../store/authReducer";
import { FaCarAlt } from "react-icons/fa";
import { useGoogleLogin, GoogleLogin } from "react-google-login";
import AzureAuthenticationButton from "../azure/azure-authentication-component";
import { AccountInfo } from "@azure/msal-browser";
import { authenticationModule } from "..";

const Login = () => {
  console.log(authenticationModule.account);
  const onAuthenticated = (userAccountInfo: AccountInfo) => {
    navigate("..");
    console.log(authenticationModule.account);
  };
  const navigate = useNavigate();
  return (
    <div className="flex-col flex-j-center flex-a-center flex-ac-center m-0 full-height">
      <div className="modal-container bg-white flex-col flex-j-center flex-ac-center flex-a-center w-400 h-400 border-radius-75 p-30 pl-10 pr-10">
        <FaCarAlt className="car-icon mb-20" />
        <div className="flex-col flex-j-end mt-20">
          <AzureAuthenticationButton
            onAuthenticated={onAuthenticated}
            mode={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
