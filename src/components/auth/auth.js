//isLoggedIn
export const isLoggedIn = () => {
  const userData = localStorage.getItem("data");
  if (userData != null) {
    return true;
  }
  return false;
};

//doLogin : data => set to localstorage
export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

//doLogout
export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

//get current user
export const getCurrentUserDetail = () => {
  if (isLoggedIn) {
    return JSON.parse(localStorage.getItem("data")).userDto;
  }
  return false;
};
