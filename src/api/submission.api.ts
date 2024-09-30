import axiosClient from "@/api/base.api.ts";

const baseUrl = "/api/v1/submission";
const submissionApi = {
  getAll() {
    return axiosClient.get(baseUrl);
  },
  submit(payload: FormData) {
    {
      return axiosClient.post(baseUrl, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }   
  },
  delete(id: number) {
    const url = `${baseUrl}/${id}`;
    return axiosClient.delete(url);
  },

};

export default submissionApi;
