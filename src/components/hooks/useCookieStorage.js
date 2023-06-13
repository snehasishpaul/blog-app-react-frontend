import { useState } from "react";
import Cookie from "js-cookie";

export const useCookieStorage = (keyName, defaultValue, expiry = 1) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (!keyName) return;

      const value = Cookie.get(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        Cookie.set(keyName, JSON.stringify(defaultValue), { expires: expiry });

        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue, expires) => {
    try {
      if (!newValue) {
        Cookie.remove(keyName);
      } else {
        Cookie.set(keyName, JSON.stringify(newValue), { expires: expires });
      }
    } catch (err) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
