import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // Only set 'Content-Type' to 'application/json' if the data is not FormData
    if (!(config.data instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
