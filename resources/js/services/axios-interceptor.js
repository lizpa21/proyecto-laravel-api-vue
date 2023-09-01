import axios from "axios";
const urlbase = "http://127.0.0.1:8000/api"
const axiosInstance = axios.create({
    baseURL: urlbase,
    timeout: 30000
});
axiosInstance.interceptors.response.use(
    (response) =>{
        return response;
    },
    (error) => {
        return Promise.reject(error);
     }
)
export default axiosInstance;