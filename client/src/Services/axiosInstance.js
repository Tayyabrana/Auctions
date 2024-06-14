import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.25:5001',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
  },
},
);

export default axiosInstance;