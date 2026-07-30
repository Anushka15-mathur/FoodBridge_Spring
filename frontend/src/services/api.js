import axios from "axios";
import { getToken, removeToken } from "../utils/token";

const API_BASE_URL = "http://localhost:8080/api";
const SERVER_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Turns a relative file path returned by the backend
// (e.g. "restaurant-logos/abc.png") into a full URL that
// can be used directly in an <img>/<a> tag. If the value
// is already a full URL, it's returned as-is.
export const resolveFileUrl = (path) => {

    if (!path) {
        return null;
    }

    if (/^https?:\/\//i.test(path)) {
        return path;
    }

    return `${SERVER_BASE_URL}/${path.replace(/^\/+/, "")}`;
};

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common.Authorization;
    }
};

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            removeToken();
            setAuthToken(null);
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;