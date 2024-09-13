import { Exercises } from "@/pages/HomePage";
import axiosClient from "./base.api"

const exercisesAPI = {
    getAll() {
        return axiosClient.get<Exercises[]>("/posts");
    },
    getAllByUserId() {
        return axiosClient.get<Exercises[]>("/posts2");
    },
    getAllByTemplate(template: string){
        return axiosClient.get<Exercises[]>(`/comments?postId=${template}`)
    },
    delete() {
        return axiosClient.delete("/delete");
    },
    add(title: string, content : string) {
        return axiosClient.post("/add", {title,content})
    },
   
    edit(id:string,  title:string, content:string) {
        return axiosClient.post("/edit", {id, title, content})
    },
    assign(id:string, userId:string) {
        return axiosClient.post("/assign",{id,userId})
    }
} 
export default exercisesAPI;