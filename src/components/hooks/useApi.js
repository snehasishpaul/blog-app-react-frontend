import { useState } from "react";
import { toast } from "react-toastify";

export const useApi = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  //   console.log("api url" + apiUrl);

  const [error, setError] = useState({
    error: {},
  });

  const callApi = async (path, method, body, headerData) => {
    return new Promise(async (resolve, reject) => {
      let headers = {
        ...headerData,
        "Content-Type": "application/json",
      };

      try {
        let response = await fetch(`${apiUrl}${path}`, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
          bodyUsed: body ? true : false,
          credentials: "include",
        });

        if (!response.ok) {
          // console.dir(response);
          if (response.status === 400) {
            let resp = await response.json();
            for (let field in resp) {
              toast.error(resp[field]);
            }
            return reject(new Error(`400 Bad Request Error : ${resp.message}`));
          } else if (response.status === 404) {
            let resp = await response.json();
            for (let field in resp) {
              toast.error(resp[field]);
            }
            return reject(new Error(`404 Not Found Error : ${resp.message}`));
          } else if (response.status === 401) {
            return reject(
              new Error("401 ERROR !! Unauthorized ! Access Denied !!")
            );
          } else if (response.status === 403) {
            return reject(
              new Error("403 ERROR !! Unauthorized ! Access Denied !!")
            );
          } else {
            return reject(
              new Error("Something went wrong outside response catch")
            );
          }
        }

        let respData = await response.json();

        return resolve(respData);
      } catch (error) {
        console.error(error);
        return reject(new Error("Something went wrong!"));
      }
    });
  };

  return { callApi, error, setError };
};
