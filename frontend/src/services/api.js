import axios from 'axios'
import { getItem } from '../utils/storage';

const api = axios.create({
    baseURL: 'https://paypay-pod.herokuapp.com',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(
    async (config) => {
        const token = getItem('token');
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`
            };
        }
        return config;
    },
    (error) => Promise.reject(error)
)
export default api;