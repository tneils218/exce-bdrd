import axiosClient from "@/api/base.api.ts";
import { Course } from "@/components/courses/CoursePage";

const baseUrl = "/api/v1/Course";
const courseApi = {
  getAll() {
    return axiosClient.get<Course[]>(baseUrl);
  },

  getById(id: number) {
    const url = `${baseUrl}/${id}`;
    return axiosClient.get<Course>(url);
  },
  add(payload: FormData) {
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

export default courseApi;
