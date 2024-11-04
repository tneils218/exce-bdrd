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
    localStorage.setItem("token", response.data.accessToken);
    user.refreshToken = response.data.refreshToken;
    localStorage.setItem("user", JSON.stringify(user)); // Cập nhật refresh token mới
  } catch (error) {
    console.log("Your session has expired, you will be logged out!", error);
    localStorage.clear();
    window.location.href = "/login"; // Chuyển về trang login khi refresh thất bại
  }
};
