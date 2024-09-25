import axiosClient from "@/api/base.api.ts";

const baseUrl = "/api/v1/exam";
const examApi = {
  getAll() {
    return axiosClient.get(baseUrl);
  },

  delete(id: string) {
    const url = `${baseUrl}/${id}`;
    return axiosClient.delete(url);
  },
};

export default examApi;
