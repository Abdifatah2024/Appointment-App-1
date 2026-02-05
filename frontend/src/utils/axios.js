import axios from "axios";

/**
 * Central Axios instance for the whole system
 * Used by Redux slices, pages, services, etc.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =====================================================
   🔐 REQUEST INTERCEPTOR
   - Attach token automatically
===================================================== */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =====================================================
   🚨 RESPONSE INTERCEPTOR
   - Handle auth errors globally
===================================================== */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Token expired / invalid
    if (status === 401) {
      localStorage.removeItem("token");

      // optional: redirect to login
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }

    // Forbidden
    if (status === 403) {
      window.location.href = "/403";
    }

    return Promise.reject(error);
  }
);

export default api;
