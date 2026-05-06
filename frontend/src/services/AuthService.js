import api from "../api/axiosConfig"

export const loginUser = (data)=>{
    return api.post("/auth/login", data)
}