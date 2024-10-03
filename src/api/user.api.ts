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

  create(data: object) {
    return axiosClient.post(baseUrl, data);
  },

  update(id: string, data: FormData) {
    const url = `${baseUrl}/${id}`;
    console.log(data.get("file"));
    return axiosClient.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
},

  delete(id: string) {
    const url = `${baseUrl}/${id}`;
    return axiosClient.delete(url);
  },
};

export default userApi;
