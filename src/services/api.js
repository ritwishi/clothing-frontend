import axios from "axios";

// 🔹 Public API (no cookies)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" }
});

// 🔹 Protected API (requires login)
const authAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});

// ===============================
// 🔐 AUTH ROUTES
// ===============================
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => authAPI.post("/auth/login", data);
export const logoutUser = () => authAPI.post("/auth/logout");
export const getMe = () => authAPI.get("/auth/me");

// ===============================
// 🛍 PUBLIC PRODUCT ROUTES
// ===============================
export const getProducts = (params) =>
  API.get("/products", { params });

export const getProductById = (id) =>
  API.get(`/products/${id}`);

export const getCategories = () =>
  API.get("/products/categories");

// ===============================
// 🛒 PROTECTED CART
// ===============================
export const addToCart = (data) =>
  authAPI.post("/cart/add", data);

export const getCart = () =>
  authAPI.get("/cart");

export const updateCartItem = (data) =>
  authAPI.put("/cart/update", data);

export const removeFromCart = (data) =>
  authAPI.delete("/cart/remove", { data });

export const clearCart = () =>
  authAPI.delete("/cart/clear");

// ===============================
// 📦 PROTECTED ORDERS
// ===============================
export const createOrder = (data) =>
  authAPI.post("/orders", data);

export const getOrderById = (id) =>
  authAPI.get(`/orders/${id}`);

export const getMyOrders = () =>
  authAPI.get("/orders/my-orders");

export default API;
