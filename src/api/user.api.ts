import axiosClient from "@/api/base.api.ts";

const baseUrl = "/api/v1/user";
const userApi = {
  getAll() {
    const url = baseUrl;
    return axiosClient.get(url);
  },

  getById(id: string) {
    const url = `${baseUrl}/${id}`;
    return axiosClient.get(url);
  },

  create(data: object) {
    const url = baseUrl;
    return axiosClient.post(url, data);
  },

  update(id: string, data: object) {
    const url = `${baseUrl}/${id}`;
    return axiosClient.put(url, data);
  },

  delete(id: string) {
    const url = `${baseUrl}/${id}`;
    return axiosClient.delete(url);
  },
};

export default userApi;
