import axios from 'axios';
import { getCookie } from './getCookie';

// for logging in/signing up
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    timeout: 5000,
    headers: {
        'Authorization': localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null,
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
    }
});

// make sure access token is updated after the five-minite limit
axiosInstance.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;
      
        // Prevent infinite loops
        if (error.response.status === 401 && originalRequest.url === 'http://127.0.0.1:8000/bolus_pal/token/refresh/') {
            window.location.href = '/login/';
            return Promise.reject(error);
        }

        if (error.response.data.code === "token_not_valid" &&
            error.response.status === 401 && 
            error.response.statusText === "Unauthorized") 
            {
                const refreshToken = localStorage.getItem('refresh_token');

                if (refreshToken){
                    const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                    // exp date in token is expressed in seconds, while now() returns milliseconds:
                    const now = Math.ceil(Date.now() / 1000);
                    // console.log(tokenParts.exp);

                    if (tokenParts.exp > now) {
                        return axiosInstance
                        .post('bolus_pal/token/refresh/', {refresh: refreshToken})
                        .then((response) => {
            
                            localStorage.setItem('access_token', response.data.access);
                            localStorage.setItem('refresh_token', response.data.refresh);
            
                            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                            originalRequest.headers['Authorization'] = "JWT " + response.data.access;
            
                            return axiosInstance(originalRequest);
                        })
                        .catch(err => {
                            console.log(err)
                        });
                    }else{
                        console.log("Refresh token is expired", tokenParts.exp, now);
                        window.location.href = '/login/';
                    }
                }else{
                    console.log("Refresh token not available.")
                    window.location.href = '/login/';
                }
        }
      
     
      // specific error handling done elsewhere
      return Promise.reject(error);
  }
);

export default axiosInstance;