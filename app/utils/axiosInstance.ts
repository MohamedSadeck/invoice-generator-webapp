import axios from 'axios';
import { BASE_URL } from './apiPaths';
import { createLogger } from './logger';

const logger = createLogger('API');

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 100000, // 100 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        logger.debug('Outgoing request', {
            method: config.method,
            url: config.url,
        });
        return config;
    }
, (error) => {
    logger.error('Request error', { error: error.message });
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
    logger.debug('Incoming response', {
        status: response.status,
        data: response.data,
    });
    return response;
}, (error) => {
    if(error.response){
        if(error.response.status === 500){
            logger.error('Server error - 500', { 
                url: error.config.url,
                method: error.config.method,
                data: error.response.data 
            });
        }else if(error.code === 'ECONNABORTED'){
            logger.error('Request timeout', { 
                url: error.config.url,
                method: error.config.method,
                message: error.message 
            });
        }
    }
    return Promise.reject(error);
});

export default axiosInstance;
