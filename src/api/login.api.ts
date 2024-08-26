import axiosClient from "@/api/base.api.ts";

const baseUrl = "/api/v1/auth";

const authApi = {
  login() {
    const url = `${baseUrl}/login`;
    return axiosClient.post(url);
  },
};

export default authApi;
