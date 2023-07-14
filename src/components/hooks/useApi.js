import { useState } from "react";
import { toast } from "react-toastify";

export const useApi = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  //   console.log("api url" + apiUrl);

  const [error, setError] = useState({
    error: {},
  });

  const callApi = async (path, method, body) => {
    return new Promise(async (resolve, reject) => {
      let headers = {
        "Content-Type": "application/json",
      };

      try {
        let response = await fetch(`${apiUrl}${path}`, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
          bodyUsed: body ? true : false,
        });

        let respData = await response.json();

        if (!response.ok) {
          console.dir(response);
          if (response.status === 404) {
            setError({
              message: "404 ERROR !! Bad Request",
            });
          }
          if (response.status === 401) {
            setError({
              message: "401 ERROR !! Unauthorized ! Access Denied !!",
            });
          }
          if (response.status === 403) {
            setError({
              message: "403 ERROR !! Unauthorized ! Access Denied !!",
            });
          } else {
            setError({
              ...respData,
            });
          }

          for (let field in respData) {
            toast.error(respData[field]);
          }
          return reject(new Error(response.status));
        }

        return resolve(respData);
      } catch (error) {
        console.error(error);
        return reject(new Error("Something went wrong!"));
      }
    });
  };

  return { callApi, error, setError };
};
