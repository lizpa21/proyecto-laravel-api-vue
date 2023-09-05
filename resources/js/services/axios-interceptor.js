import axios from 'axios'

const urlbase = "http://127.0.0.1:8000/api"

const token = localStorage.getItem("access_token")

const axiosInstance = axios.create({
    baseURL: urlbase,
    timeout: 30000,
    headers: {
        Authorization: "Bearer " + token
    }
});

// interceptar error (401, 403)
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // procesamos error 401, 403

        return Promise.reject(error);
    }
);

export default axiosInstance;