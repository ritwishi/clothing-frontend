import axios from "axios";

// Base URL from Vite environment variable
const BASE_URL = import.meta.env.VITE_API_URL || "https://clothing-backend-hxe9.onrender.com";

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL + "/api",
  withCredentials: true, // VERY IMPORTANT FOR JWT COOKIE
  headers: {
    "Content-Type": "application/json",
  },
});

// ===============================
// 🔐 AUTH ROUTES
// ===============================
export const registerUser = (data) =>
  api.post("/auth/register", data);

export const loginUser = (data) =>
  api.post("/auth/login", data);

export const logoutUser = () =>
  api.post("/auth/logout");

export const getMe = () =>
  api.get("/auth/me");

// ===============================
// 🛍 PRODUCTS (PUBLIC)
// ===============================
export const getProducts = (params) =>
  api.get("/products", { params });

export const getProductById = (id) =>
  api.get(`/products/${id}`);

export const getCategories = () =>
  api.get("/products/categories");

// ===============================
// 🛒 CART (PROTECTED)
// ===============================
export const addToCart = (data) =>
  api.post("/cart/add", data);

export const getCart = () =>
  api.get("/cart");

export const updateCartItem = (data) =>
  api.put("/cart/update", data);

export const removeFromCart = (data) =>
  api.delete("/cart/remove", { data });

export const clearCart = () =>
  api.delete("/cart/clear");

// ===============================
// 📦 ORDERS (PROTECTED)
// ===============================
export const createOrder = (data) =>
  api.post("/orders", data);

export const getOrderById = (id) =>
  api.get(`/orders/${id}`);

export const getMyOrders = () =>
  api.get("/orders/my-orders");

export default api;
