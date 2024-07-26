import { axiosInstance } from "./axiosInstance.js";


export const userLogin = async (payload) => {
    const response = await axiosInstance("post", "/api/login", payload);
    return response;
}
export const getUser = async () => {
    const response = await axiosInstance("get", "/api/getUser");
    return response;
}

export const userRegistration = async (payload) => {
    const response = await axiosInstance("post", "/api/registration", payload);
    return response;
}