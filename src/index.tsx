import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import CarReducer from "./store/carReducer";
import AuthReducer from "./store/authReducer";
import { applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import AzureAuthenticationContext from "./azure/azure-authentication-context";

const rootReducer = combineReducers({
  carReducer: CarReducer,
  authReducer: AuthReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const authenticationModule: AzureAuthenticationContext =
new AzureAuthenticationContext();

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
    <MsalProvider instance={authenticationModule.myMSALObj}>
      <Provider store={store}>
        <App />
      </Provider>
      </MsalProvider>
    </React.StrictMode>{" "}
  </BrowserRouter>,
  document.getElementById("root")
);
