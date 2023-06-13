import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/auth-context";

const PrivateLayout = () => {
  const authContext = useContext(AuthContext);
  return authContext.isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateLayout;
