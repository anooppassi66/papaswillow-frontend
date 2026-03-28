/**
 * axios setup to use mock service
 */

import axios, { AxiosRequestConfig } from 'axios';

const axiosAuthServices = axios.create({
    baseURL: import.meta.env.VITE_APP_AUTH_API_URL
    // withCredentials: true
});

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosAuthServices.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('serviceToken');
        console.log('serviceToken', accessToken);
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        console.log(config, 'configconfigconfig');
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// axiosAuthServices.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response.status === 401 && !window.location.href.includes('/login')) {
//             window.location.pathname = '/login';
//         }
//         return Promise.reject((error.response && error.response.data) || 'Wrong Services');
//     }
// );

axiosAuthServices.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
       
        if (error.response.status === 401 && !originalRequest._retry) {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                originalRequest._retry = true;
                try {
                    const response = await axiosAuthServices.post(`/api/v1/auth/refresh`, { refreshToken });
                    // don't use axious instance that already configured for refresh token api call
                    const newAccessToken = response.data.accessToken;
                    localStorage.setItem('serviceToken', newAccessToken); //set new access token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios(originalRequest); //recall Api with new token
                } catch (error) {
                    localStorage.getItem('serviceToken');
                    window.location.pathname = '/login';
                }
            } else {
                localStorage.setItem('serviceToken', '');
                // return Promise.reject(error);
                window.location.pathname = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosAuthServices;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosAuthServices.get(url, { ...config });

    return res.data;
};
