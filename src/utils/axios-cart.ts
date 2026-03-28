/**
 * axios setup to use mock service
 */

import axios, { AxiosRequestConfig } from 'axios';

const axiosCartServices = axios.create({
    baseURL: import.meta.env.VITE_APP_CART_API_URL || 'http://localhost:3010/'
    // withCredentials: true
});

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosCartServices.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('serviceToken');
        console.log('serviceToken', accessToken);
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
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

axiosCartServices.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const response = await axiosCartServices.post(`/api/v1/auth/refresh`, { refreshToken });
                    // don't use axious instance that already configured for refresh token api call
                    const newAccessToken = response.data.accessToken;
                    localStorage.setItem('serviceToken', newAccessToken); //set new access token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios(originalRequest); //recall Api with new token
                } catch (error) {
                    // window.location.pathname = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosCartServices;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosCartServices.get(url, { ...config });

    return res.data;
};
