import axios from 'axios';
import config from '../../config/config.js';

const axiosInstance = axios.create({
    baseURL: config.baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const requestHelper = {
    get: async (endpoint) => {
        const response = await axiosInstance.get(endpoint);
        return response;
    },
    post: async (endpoint, body) => {
        const response = await axiosInstance.post(endpoint, body);
        return response;
    },
    put: async (endpoint, body) => {
        const response = await axiosInstance.put(endpoint, body);
        return response;
    },
    delete: async (endpoint) => {
        const response = await axiosInstance.delete(endpoint);
        return response;
    }
};

export default requestHelper;
