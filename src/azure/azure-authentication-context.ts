import {
    PublicClientApplication,
    AuthenticationResult,
    AccountInfo,
    EndSessionRequest,
    RedirectRequest,
    PopupRequest,
  } from "@azure/msal-browser";
  
  import { MSAL_CONFIG } from "./azure-authentication-config";
  

  function hasOwnProperty<X extends {}, Y extends PropertyKey>
  (obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)
}
  export class AzureAuthenticationContext {
    public myMSALObj: PublicClientApplication = new PublicClientApplication(
      MSAL_CONFIG
    );
    public account?: AccountInfo;
    private loginRedirectRequest?: RedirectRequest;
    private loginRequest?: PopupRequest;
  
    public isAuthenticationConfigured = false;
    public isAdmin = false;
    public isAuthenticated = false;

  
    constructor() {
      // @ts-ignore
      this.account = null;
      this.setRequestObjects();
      if (MSAL_CONFIG?.auth?.clientId) {
        this.isAuthenticationConfigured = true;
      }
    }
  
    private setRequestObjects(): void {
      this.loginRequest = {
        scopes: [],
        prompt: "select_account",
      };
  
      this.loginRedirectRequest = {
        ...this.loginRequest,
        redirectStartPage: window.location.href,
      };
    }
  
    login(signInType: string, setUser: any): void {
      if (signInType === "loginPopup") {
        this.myMSALObj
          .loginPopup(this.loginRequest)
          .then((resp: AuthenticationResult) => {
            this.handleResponse(resp, setUser);
            this.isAuthenticated = true;
          })
          .catch((err) => {
            console.error(err);
          });
      } else if (signInType === "loginRedirect") {
        this.myMSALObj.loginRedirect(this.loginRedirectRequest);
      }
    }
  
    logout(account: AccountInfo): void {
      // const logOutRequest: EndSessionRequest = {
      //   account,
      // };
      const currentAccounts = this.myMSALObj.getAllAccounts();
      currentAccounts.forEach((account: AccountInfo) => {
        const logOutRequest: EndSessionRequest = {
          account,
        };
        this.myMSALObj.logoutPopup(logOutRequest);
        this.account = undefined;
      })
      this.isAuthenticated = false;
      //this.myMSALObj.logout(logOutRequest);
    }
    handleResponse(response: AuthenticationResult, incomingFunction: any) {
      if(response !==null && response.account !==null) {
        this.account = response.account;
      } else {
        this.account = this.getAccount();
      }
  
      if (this.account) {
        incomingFunction(this.account);
      }
    }
    public getAccount(): AccountInfo | undefined {
      console.log(`loadAuthModule`);
      const currentAccounts = this.myMSALObj.getAllAccounts();
      if (currentAccounts === null) {
        // @ts-ignore
        console.log("No accounts detected");
        return undefined;
      }
  
      if (currentAccounts.length > 1) {
        // TBD: Add choose account code here
        // @ts-ignore
        console.log(
          "Multiple accounts detected, need to add choose account code."
        );
        return currentAccounts[0];
      } else if (currentAccounts.length === 1) {
        return currentAccounts[0];
      }
    }
    public getUserId(): string {
      const userInfo = this.getAccount();
      console.log(userInfo);
      if(userInfo !== undefined && userInfo.idTokenClaims && hasOwnProperty(userInfo.idTokenClaims, 'oid') && typeof userInfo.idTokenClaims.oid === 'string') {
        return userInfo.idTokenClaims['oid'];
      }
        return "";
    }
    public getUserClaims(): string[] {
      const userInfo = this.getAccount();
      if(userInfo !== undefined && userInfo.idTokenClaims && hasOwnProperty(userInfo.idTokenClaims, 'roles') &&  Array.isArray(userInfo.idTokenClaims.roles)) {
        return userInfo.idTokenClaims['roles'];
      }
        return [];
    }
    public getUserEmail(): string {
      const userInfo = this.getAccount();
      if(userInfo !== undefined && userInfo.username && typeof userInfo.username === 'string') {
        return userInfo.username;
      }
        return "";
    }

    public setAdmin(): void {
      this.isAdmin = true;
    }
  }
  
  export default AzureAuthenticationContext;