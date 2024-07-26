import axios from 'axios';

const backend_url = "https://venture-horizon-backend.vercel.app"
export const axiosInstanceQuery = async (method, endpoint, payload) => {
  try {
    const config = {
      method,
      url: `${backend_url}${endpoint}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    if (method.toLowerCase() === 'get' && payload) {
      config.params = payload;
    } else {
      config.data = payload;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      throw error;
    }
  }
};
