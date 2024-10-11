import authApi from "@/api/auth.api";
import { notify } from "./notify";

export const refreshToken = async () => {
  const accessToken = localStorage.getItem("token");
  const userJson = localStorage.getItem("user");
  let user;
  let refreshToken;
  if (userJson) {
    user = JSON.parse(userJson);
    refreshToken = user.refreshToken;
  }
  try {
    var response = await authApi.refreshToken({ accessToken, refreshToken });
    console.log(response);
    localStorage.setItem("token", response.data.accessToken);
    user.refreshToken = response.data.refreshToken;
  } catch {
    notify("Your session has expired, you will be logout!");
    localStorage.clear();
    await authApi.logout();
  }
};
