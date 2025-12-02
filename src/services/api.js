// src/services/api.js

import axios from "axios";

/**
 * IMPORTANT:
 * VITE_API_URL SHOULD BE ONLY BACKEND ROOT:
 * https://clothing-backend-hxe9.onrender.com
 * (NO /api at the end)
 */

const rawBase =
  import.meta.env.VITE_API_URL ||
  "https://clothing-backend-hxe9.onrender.com";

// Remove trailing slashes if user added them
const BACKEND_ROOT = rawBase.replace(/\/+$/, "");

// Final baseURL = https://backend/api
const api = axios.create({
  baseURL: BACKEND_ROOT + "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ---------------------------------------
   AUTH
---------------------------------------- */
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const logoutUser = () => api.post("/auth/logout");
export const getMe = () => api.get("/auth/me");

/* ---------------------------------------
   PRODUCTS
---------------------------------------- */
export const getProducts = (params) => api.get("/products", { params });
export const getProductById = (id) => api.get(`/products/${id}`);
export const getCategories = () => api.get("/products/categories");

/* ---------------------------------------
   CART
---------------------------------------- */
export const addToCart = (data) => api.post("/cart/add", data);
export const getCart = () => api.get("/cart");
export const updateCartItem = (data) => api.put("/cart/update", data);
export const removeFromCart = (data) => api.delete("/cart/remove", { data });
export const clearCart = () => api.delete("/cart/clear");

/* ---------------------------------------
   ORDERS
---------------------------------------- */
export const createOrder = (data) => api.post("/orders", data);
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const getMyOrders = () => api.get("/orders/my-orders");

export default api;
