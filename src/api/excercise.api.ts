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
    delete(data: object) {
        const url = `${baseUrl}/${data.id}`
        return axiosClient.delete(url);
    },
    add(data: object) {
        return axiosClient.post("/add", data)
    },
   
    edit(data: object) {
        return axiosClient.post("/edit", data)
    },
    assign(data: object) {
        return axiosClient.post("/assign",data)
    },
    submit(data: object){
        return axiosClient.post("/submit",data)
    }

} 
export default exercisesAPI;