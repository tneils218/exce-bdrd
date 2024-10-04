import axiosClient from "@/api/base.api.ts";

const baseUrl = "/api/v1/exam";
const examApi = {
  getAll() {
    return axiosClient.get(baseUrl);
  },
  add(payload: object) {
      return axiosClient.post(baseUrl, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  },
  edit(payload: FormData) {
      return axiosClient.put(baseUrl, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  },
  delete(id: number) {
    const url = `${baseUrl}/${id}`;
    return axiosClient.delete(url);
  },
};

export default examApi;
