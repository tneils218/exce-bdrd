import axiosClient from "@/api/base.api.ts";
import { Course } from "@/components/courses/CoursePage";

const baseUrl = "/api/v1/Course";
const courseApi = {
  getAll() {
    return axiosClient.get<Course[]>(baseUrl);
  },

  getById(id: string) {
    const url = `${baseUrl}/${id}`;
    return axiosClient.get<Course>(url);
  },
};

export default courseApi;
