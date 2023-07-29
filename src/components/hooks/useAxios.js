import axios from "axios";
import React from "react";

const useAxios = () => {
  const myAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });

  return { myAxios };
};

export default useAxios;
