import axios from 'axios';


const backend_url = "https://venture-horizon-backend.vercel.app"
export const axiosInstance = async (method, endpoint, payload) => {
    try {
        const response = await axios({
            method,
            url: `${backend_url}${endpoint}`,
            data: payload,
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,

            },
        });
        return response.data;

    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        }
        else {
            throw new error;
        }

    }
}


