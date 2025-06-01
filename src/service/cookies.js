import Cookies from "js-cookie";

export const CookieKey = {
  ACCESS_TOKEN: "admin-camera-access-token",
};

export const getCookie = (key) => {
  return Cookies.get(key);
};

export const setCookie = (key, value) => {
  Cookies.set(key, value);
};

export const removeCookie = (key) => {
  Cookies.remove(key);
};

export const clearAuthCookie = () => {
  removeCookie(CookieKey.ACCESS_TOKEN);
};

export const getAuthCredentials = () => {
  return getCookie(CookieKey.ACCESS_TOKEN);
};
