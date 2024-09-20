import axiosClient from "@/api/base.api.ts";

const baseUrl = "/api/v1/user";
const userApi = {
  getAll() {
    return axiosClient.get(baseUrl);
  },

  getById(id: string) {
    const url = `${baseUrl}/${id}`;
    return axiosClient.get(url);
  },

  create(payload: object) {
    return axiosClient.post(baseUrl, payload);
  },

  update(id: string, payload: object) {
    const url = `${baseUrl}/${id}`;
    return axiosClient.put(url, payload);
  },

  delete(id: string) {
    const url = `${baseUrl}/${id}`;
    return axiosClient.delete(url);
  },
  
};

export default userApi;
