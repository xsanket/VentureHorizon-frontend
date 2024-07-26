import axios from "axios";
import { axiosInstance } from "./axiosInstance";
export const countProject = async (payload) => {
    const response = await axiosInstance('get', '/api/countProject', payload);
    return response;
}
export const getGraphData = async (payload) => {
    const response = await axiosInstance('get', '/api/getGraphData', payload);
    return response;
}