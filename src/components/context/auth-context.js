import React, { useEffect, useMemo, useState } from "react";

const AuthContext = React.createContext({
  isLoggedInState: false,
  user: undefined,
  isLoggedIn: () => {},
  doLogin: (data, next) => {},
  doLogout: (next) => {},
  getCurrentUserDetail: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedInState, setIsLoggedInState] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setIsLoggedInState(isLoggedIn());
    setUser(getCurrentUserDetail());
  }, [isLoggedInState]);

  //isLoggedIn
  const isLoggedIn = () => {
    const userData = localStorage.getItem("data");
    if (userData != null) {
      return true;
    }
    return false;
  };

  //doLogin : data => set to localstorage
  const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data));
    sessionStorage.setItem("data", JSON.stringify(data));
    setIsLoggedInState(true);
    next();
  };

  //doLogout
  const doLogout = (next) => {
    localStorage.removeItem("data");
    setIsLoggedInState(false);
    next();
  };

  //get current user
  const getCurrentUserDetail = () => {
    if (isLoggedIn()) {
      return JSON.parse(localStorage.getItem("data")).userDto;
    }
    return false;
  };

  const value = useMemo(
    () => ({
      isLoggedInState: isLoggedInState,
      user: user,
      isLoggedIn: isLoggedIn,
      doLogin: doLogin,
      doLogout: doLogout,
      getCurrentUserDetail: getCurrentUserDetail,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}> {props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
