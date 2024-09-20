import { Exercises } from "@/pages/HomePage";
import axiosClient from "./base.api"
const baseUrl = "/api/v1/Exam";
const exercisesAPI = {
    getAll() {
        return axiosClient.get<Exercises[]>(baseUrl);
    },
    getAllByUserId() {
        return axiosClient.get<Exercises[]>("/posts2");
    },
    getAllByTemplate(template: string){
        return axiosClient.get<Exercises[]>(`/comments?postId=${template}`)
    },
    delete(payload: object) {
        const url = `${baseUrl}/${payload.id}`
        return axiosClient.delete(url);
    },
    add(payload: FormData) {
        return axiosClient.post(baseUrl, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      },
   
    edit(payload: object) {
        return axiosClient.put(`${baseUrl}/${payload.id}`, payload)
    },
    assign(payload: object) {
        return axiosClient.post("/assign",payload)
    },
    submit(payload: object){
        return axiosClient.post("/submit",payload)
    }

} 
export default exercisesAPI;