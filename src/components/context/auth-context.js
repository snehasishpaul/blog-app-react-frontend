import React, { useEffect, useMemo, useState } from "react";
import { useLocalStorageModified } from "../hooks/useLocalStorageModified";

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
  const [getData, setData, removeData] = useLocalStorageModified("data");

  useEffect(() => {
    setIsLoggedInState(isLoggedIn());
    setUser(getCurrentUserDetail());
  }, [isLoggedInState]);

  //isLoggedIn
  const isLoggedIn = () => {
    const userData = getData();
    if (userData != null) {
      return true;
    }
    return false;
  };

  //doLogin : data => set to localstorage
  const doLogin = (data, next) => {
    setData(data);
    setIsLoggedInState(true);
    next();
  };

  //doLogout
  const doLogout = (next) => {
    removeData();
    setIsLoggedInState(false);
    next();
  };

  //get current user
  const getCurrentUserDetail = () => {
    if (isLoggedIn()) {
      return getData().userDto;
    }
    return undefined;
  };

  const getToken = () => {
    if (isLoggedIn()) {
      return getData().token;
    }
  };

  const value = useMemo(
    () => ({
      isLoggedInState: isLoggedInState,
      user: user,
      isLoggedIn: isLoggedIn,
      doLogin: doLogin,
      doLogout: doLogout,
      getCurrentUserDetail: getCurrentUserDetail,
      getToken: getToken,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
