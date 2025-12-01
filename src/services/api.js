import axios from "axios";

// PUBLIC instance (no cookies)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// PROTECTED instance (sends cookies)
const authAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Only protected routes use this
  headers: {
    "Content-Type": "application/json",
  },
});

/* ============================
   AUTH ROUTES
============================ */

// Register & Login are PUBLIC — no cookies yet
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Logout & /auth/me are PROTECTED — need cookies
export const logoutUser = () => authAPI.post("/auth/logout");
export const getMe = () => authAPI.get("/auth/me");

/* ============================
   PRODUCTS (PUBLIC)
============================ */

export const getProducts = (params) =>
  API.get("/products", { params });

export const getProductById = (id) =>
  API.get(`/products/${id}`);

export const getCategories = () =>
  API.get("/products/categories");

/* ============================
   CART (PROTECTED)
============================ */

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

/* ============================
   ORDERS (PROTECTED)
============================ */

export const createOrder = (data) =>
  authAPI.post("/orders", data);

export const getOrderById = (id) =>
  authAPI.get(`/orders/${id}`);

export const getMyOrders = () =>
  authAPI.get("/orders/my-orders");

export default API;
