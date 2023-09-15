import axios from 'axios'

// const urlbase = "http://127.0.0.1:8000/api"
const urlbase = "/api"

export const http = () => {
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
            if(error.response.status === 401){
                localStorage.removeItem("access_token");

                window.location = "/login"
            }
    
            return Promise.reject(error);
        }
    );

    return axiosInstance;
} 
