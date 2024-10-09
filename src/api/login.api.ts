import axiosClient from "@/api/base.api.ts";

const baseUrl = "/api/v1/auth";

const authApi = {
  login(username: string, password: string) {
    const url = `${baseUrl}/login`;
    const body = {
      email: username,
      password: password,
    };
    return axiosClient.post(url, body);
  },
  register(body: object) {
    const url = `${baseUrl}/register`;
    return axiosClient.post(url, body);
  },
  logout() {
    const url = `${baseUrl}/logout`;
    return axiosClient.post(url);
  },
  changePassword(payload: object) {
    const url = `${baseUrl}/change-password`;
    return axiosClient.post(url, payload);
  }
};

export default authApi;
