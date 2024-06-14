import axiosInstance from './axiosInstance';
import Cookies from 'js-cookie';


const productService = {
    getAllProducts: async () => {
        try {
            const response = await axiosInstance.get('/products/get-all-products',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
                    }
                });
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },
    getAllRecommendedProducts: async () => {
        try {
            const response = await axiosInstance.get('/products/get-all-recommended-products', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },
    getAllCuratedProducts: async () => {
        try {
            const response = await axiosInstance.get('/products/get-all-curated-products',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
                    }
                });
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },
    getAllApprovedNormalProducts: async () => {
        try {
            const response = await axiosInstance.get('/products/get-all-approved-normal-products',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
                    }
                });
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },
    getAllApprovedProducts: async () => {
        try {
            const response = await axiosInstance.get('/products/get-all-approved-products',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
                    }
                });
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },
    getAuctionProducts: async () => {
        try {
            const response = await axiosInstance.get('/products/get-auction-products',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
                    }
                });
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },
    getOngoingAuctionProducts: async () => {
        try {
            const response = await axiosInstance.get('/products/get-ongoing-auction-products',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
                    }
                });
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },
    getUserProducts: async () => {
        try {
            const response = await axiosInstance.get('/products/get-user-products',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
                    }
                });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getProductById: async (id) => {
        try {
            const response = await axiosInstance.get(`/products/details/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
                    }
                },
            )
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    addProductToAuction: async (id) => {
        try {
            const response = axiosInstance.put(`/products/add-product-to-auction/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
                    }
                })
            return response;
        } catch (error) {
            throw error;
        }
    },
    approveProduct: async (id) => {
        try {
            const response = axiosInstance.put(`/products/approve/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
                    }
                })
            return response;
        } catch (error) {
            throw error;
        }
    },
    rejectProduct: async (id) => {
        try {
            const response = axiosInstance.put(`/products/reject/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
                    }
                })
            return response;
        } catch (error) {
            throw error;
        }
    },
    recommendProduct: async (id) => {
        try {
            const response = axiosInstance.put(`/products/recommended/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
                    }
                })
            return response;
        } catch (error) {
            throw error;
        }
    },
    curatedProduct: async (id) => {
        try {
            const response = axiosInstance.put(`/products/curated/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
                    }
                })
            return response;
        } catch (error) {
            throw error;
        }
    },
    registerProduct: async (payload) => {
        try {
            const response = await axiosInstance.post('/products/register-product', payload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    approveForAuction: async (payload) => {
        try {
            console.log(payload)
            const response = await axiosInstance.post('/products/approve-for-auction', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    bidProduct: async (payload) => {
        try {
            const response = await axiosInstance.post('/products/bid-request', payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
                    }
                });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    bidAuction: async (payload) => {
        try {
            const response = await axiosInstance.post('/products/bid-auction', payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('auction-jwt-token')}`
                    }
                });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    auctionBids: async (id) => {
        try {
            const response = await axiosInstance.get(`/products/auction-bids/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

};

export default productService;
