  export function isLoggedInAdmin() {
    return localStorage.getItem("access_token")!==null && localStorage.getItem("access_token")!=="undefined" && localStorage.getItem("user_type")=="admin";
  }

    export function isLoggedInRegular() {
    return localStorage.getItem("access_token")!==null && localStorage.getItem("access_token")!=="undefined" && localStorage.getItem("user_type")=="regular";
  }

  export function deleteTokens(){
      localStorage.removeItem("access_token");
      localStorage.removeItem("username");
      localStorage.removeItem("user_initials");
      localStorage.removeItem("user_type");
  }
  
  export function requiredAuth(nextState, replace) {
    if (!isLoggedInAdmin() || isLoggedInRegular()) {
      replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }