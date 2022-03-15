import React, { useEffect, useState } from "react";
import AzureAuthenticationContext from "./azure-authentication-context";
import { AccountInfo } from "@azure/msal-browser";
import { HiUser } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";
import { AuthState, login, logout } from "../store/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { CarState } from "../store/carReducer";
import { useIsAuthenticated } from "@azure/msal-react";
import { authenticationModule} from "..";
import { useNavigate } from "react-router-dom";

const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const isIE = msie > 0 || msie11 > 0;

interface PropsType {
  onAuthenticated: any;
  mode: boolean;
}

// Log In, Log Out button
const AzureAuthenticationButton = (props: PropsType): JSX.Element => {
  //const isAuthenticated = useIsAuthenticated();

  //const [authenticated, setAuthenticated] = useState<Boolean>(isAuthenticated);

  const logIn = (method: string): any => {
    const typeName = "loginPopup";
    const logInType = isIE ? "loginRedirect" : typeName;
    authenticationModule.login(logInType, returnedAccountInfo);
    props.onAuthenticated(undefined);
  };

  const logOut = (): any => {
    const user = authenticationModule.getAccount();
    if(typeof user !== "undefined"){
      props.onAuthenticated(undefined);
      authenticationModule.logout(user);
      authenticationModule.isAdmin = false;
    }
  };

  const returnedAccountInfo = (user: AccountInfo) => {
    // set state
    //setAuthenticated(user?.name ? true : false);
    //auth
    props.onAuthenticated(user);
  };

  const showLogInButton = (): any => {
    return (
      <button
        id="authenticationButton"
        className="s-20 text-center bg-transparent flex-row flex-ac-center color-white"
        onClick={() => logIn("loginPopup")}
      >
        <HiUser />
      </button>
    );
  };

  const logInButton = (): any => {
    return (
      <button
        className="modal-button-rent bg-c2 w-220 h-50 border-radius-75 s-28 text-center font-weight-700 color-white no-border mb-5"
        onClick={() => logIn("loginPopup")}
      >
        Log in
      </button>
    );
  };

  const logOutButton = (): any => {
    return (
      <button
        className="modal-button-rent bg-c2 w-220 h-50 border-radius-75 s-28 text-center font-weight-700 color-white no-border mb-5"
        onClick={() => logOut()}
      >
        Log out
      </button>
    );
  };

  const showLogOutButton = (): any => {
    return (
      <div id="authenticationButtonDiv">
        <div id="authentication">
          <button
            className="s-20 text-center bg-transparent flex-row flex-ac-center color-white"
            id="authenticationButton"
            onClick={() => logOut()}
          >
            <MdOutlineLogout />
          </button>
        </div>
      </div>
    );
  };

  const showButton = (): any => {
    return authenticationModule.account  ? showLogOutButton() : showLogInButton();
  };

  const showAzureButton = (): any => {
    return authenticationModule.account  ? logOutButton() : logInButton();
  };

  const showButtons = props.mode ? showAzureButton : showButton;

  return (
    <div>
      {authenticationModule.isAuthenticationConfigured ? (
        showButtons()
      ) : (
        <div>Authentication Client ID is not configured.</div>
      )}
    </div>
  );
};

export default AzureAuthenticationButton;
