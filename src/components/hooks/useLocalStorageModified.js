import { useState } from "react";
import secureLocalStorage from "react-secure-storage";

export const useLocalStorageModified = (keyName) => {
  const [key, setKey] = useState(window.btoa(window.btoa(keyName)));

  const getValue = () => {
    const value = secureLocalStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  };

  const setValue = (value) => {
    secureLocalStorage.setItem(key, JSON.stringify(value));
  };

  const removeValue = () => {
    secureLocalStorage.removeItem(key);
  };

  return [getValue, setValue, removeValue];
};
