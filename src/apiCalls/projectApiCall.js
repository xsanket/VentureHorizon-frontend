import axios from "axios";
import { axiosInstance } from "./axiosInstance"
import { axiosInstanceQuery } from "./axiosInstanceQuery";


export const createProject = async (payload) => {
  const response = await axiosInstance("post", "/api/createProject", payload);
  return response;
};


export const fetchUpdatedProjects = async (payload) => {
    const response = await axiosInstance("get", `https://venture-horizon-backend.vercel.app/api/fetchProjects`, payload);
    return response;
}


export const fetchProjects = async (page, query, sort) => {
  try {
    const params = {
      limit: 10,
      page,
      filter: query,
      sort: sort,
    };
    const response = await axiosInstanceQuery('get', '/api/fetchProjects', params);
    return response;
  } catch (error) {
    throw error;
  }
};






export const updateProjectStatus = async ({  value, id }) => {
  try {
    const response = await axios.put('https://venture-horizon-backend.vercel.app/api/updateProjectStatus', {
      Status: value,
      id: id
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
