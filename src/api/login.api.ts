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
};

export default authApi;
