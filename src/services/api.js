import axios from 'axios';

// -----------------------------
// USE ENV VARIABLE INSTEAD OF LOCALHOST
// -----------------------------
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
API.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response Interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized - Please login');
    }
    return Promise.reject(error);
  }
);

// Auth Calls
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const logoutUser = () => API.post('/auth/logout');
export const getMe = () => API.get('/auth/me');

// Product Calls
export const getProducts = (params) => API.get('/products', { params });
export const getProductById = (id) => API.get(`/products/${id}`);
export const getCategories = () => API.get('/products/categories');

// Cart Calls
export const addToCart = (data) => API.post('/cart/add', data);
export const getCart = () => API.get('/cart');
export const updateCartItem = (data) => API.put('/cart/update', data);
export const removeFromCart = (data) => API.delete('/cart/remove', { data });
export const clearCart = () => API.delete('/cart/clear');

// Order Calls
export const createOrder = (data) => API.post('/orders', data);
export const getOrderById = (id) => API.get(`/orders/${id}`);
export const getMyOrders = () => API.get('/orders/my-orders');

export default API;
