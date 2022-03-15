import { AccountInfo} from "@azure/msal-common";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  token:string;
  user: (AccountInfo | null);
}

const initialState: AuthState = {
  isAuthenticated: false,
  isAdmin: false,
  token: "",
  user: null
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      console.log("login");
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state, action) => {
      console.log("logout");
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.user = null;
    },
    logAsAdmin: (state, action) => {
      console.log(action.payload);
      console.log("login");
      state.isAuthenticated = true;
      state.isAdmin = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    }
  },
});

export const { login, logout, logAsAdmin, setToken } = AuthSlice.actions;

export default AuthSlice.reducer;
