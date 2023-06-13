import { useState } from "react";
import Cookie from "js-cookie";

export const useCookieStorageModified = (keyName, expiry = 1) => {
  const [key, setKey] = useState(window.btoa(window.btoa(keyName)));

  const getValue = () => {
    const value = Cookie.get(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  };

  const setValue = (value) => {
    Cookie.set(key, JSON.stringify(value), { expires: expiry });
  };

  const removeValue = () => {
    Cookie.remove(keyName);
  };

  return [getValue, setValue, removeValue];
};
