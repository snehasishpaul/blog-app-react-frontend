import { useState } from "react";
import secureLocalStorage from "react-secure-storage";

export const useLocalStorage = (keyName, defaultValue) => {
  keyName = window.btoa(window.btoa(keyName));
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = secureLocalStorage.getItem(keyName);
      // const value = localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        secureLocalStorage.setItem(keyName, JSON.stringify(defaultValue));
        // localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue) => {
    try {
      if (!newValue) {
        secureLocalStorage.removeItem(keyName);
        // localStorage.removeItem(keyName);
      } else {
        secureLocalStorage.setItem(keyName, JSON.stringify(newValue));
        // localStorage.setItem(keyName, JSON.stringify(newValue));
      }
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
