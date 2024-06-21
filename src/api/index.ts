import axios, { InternalAxiosRequestConfig } from 'axios';

import { getSession } from 'next-auth/react';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_DEFAULT,
});

api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const session = await getSession();
        const token = session?.accessToken;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
