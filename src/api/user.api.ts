import axiosClient from "@/api/base.api.ts";

const baseUrl = "/api/v1/user";
const userApi = {
  getAll() {
    return axiosClient.get("/users");
  },

  getById(id: string) {
    const url = `${baseUrl}/${id}`;
    return axiosClient.get(url);
  },

  create(data: object) {
    return axiosClient.post(baseUrl, data);
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
