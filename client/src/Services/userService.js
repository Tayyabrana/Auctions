import axiosInstance from './axiosInstance';
import Cookies from 'js-cookie';

const userService = {
    getUserInfo: async () => {
        try {
            const response = await axiosInstance.get('/users/get-user-info');
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },
    registerUser: async (payload) => {
        try {
            console.log(payload)
            const response = await axiosInstance.post('/users/register', payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    loginUser: async (payload) => {
        try {
            const response = await axiosInstance.post('/users/login', payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getRole: async () => {
        try {
            const response = await axiosInstance.get('/users/role',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default userService;