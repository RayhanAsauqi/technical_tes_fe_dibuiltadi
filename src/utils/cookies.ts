import Cookies from "js-cookie";

const TOKEN_KEY = "accessToken";

export function getToken(): string | null {
  return Cookies.get(TOKEN_KEY) || null;
}

export const removeToken = (): void => {
  Cookies.remove("accessToken");
};

export const removeUser = (): void => {
  Cookies.remove("user");
};
export const clearAuthCookies = (): void => {
  removeToken();
  removeUser();
};
