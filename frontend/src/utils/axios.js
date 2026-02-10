// // import axios from "axios";

// // /**
// //  * Central Axios instance for the whole system
// //  * Used by Redux slices, pages, services, etc.
// //  */
// // const api = axios.create({
// //   baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
// //   timeout: 15000,
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // });

// // /* =====================================================
// //    🔐 REQUEST INTERCEPTOR
// //    - Attach token automatically
// // ===================================================== */
// // api.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("token");

// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }

// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // /* =====================================================
// //    🚨 RESPONSE INTERCEPTOR
// //    - Handle auth errors globally
// // ===================================================== */
// // api.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     const status = error.response?.status;

// //     // Token expired / invalid
// //     if (status === 401) {
// //       localStorage.removeItem("token");

// //       // optional: redirect to login
// //       if (window.location.pathname !== "/") {
// //         window.location.href = "/";
// //       }
// //     }

// //     // Forbidden
// //     if (status === 403) {
// //       window.location.href = "/403";
// //     }

// //     return Promise.reject(error);
// //   }
// // );

// // export default api;
// import axios from "axios";

// /**
//  * Central Axios instance for the whole system
//  */
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
//   timeout: 15000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// /* =====================================================
//    🔐 REQUEST INTERCEPTOR
// ===================================================== */
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("appointment_app_token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// /* =====================================================
//    🚨 RESPONSE INTERCEPTOR
// ===================================================== */
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status;

//     // 🔐 Unauthorized → logout
//     if (status === 401) {
//       localStorage.removeItem("appointment_app_token");

//       if (window.location.pathname !== "/") {
//         window.location.href = "/";
//       }
//     }

//     // 🚫 Forbidden → unauthorized page (NOT /403)
//     if (status === 403) {
//       if (window.location.pathname !== "/unauthorized") {
//         window.location.href = "/unauthorized";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
import axios from "axios";

/**
 * =====================================================
 * Central Axios instance
 * =====================================================
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * =====================================================
 * 🔐 REQUEST INTERCEPTOR
 * - Attach JWT token if exists
 * =====================================================
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("appointment_app_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * =====================================================
 * 🚨 RESPONSE INTERCEPTOR
 * - SAFE auth handling
 * =====================================================
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const token = localStorage.getItem("appointment_app_token");

    /**
     * 🔴 401 – Unauthorized
     * Meaning:
     * - Token expired
     * - Token invalid
     * → Logout user
     */
    if (status === 401 && token) {
      console.warn("Session expired (401)");

      localStorage.removeItem("appointment_app_token");

      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }

    /**
     * 🛑 403 – Forbidden
     * Meaning:
     * - User logged in
     * - Role not allowed
     * → Keep token, redirect only
     */
    if (status === 403) {
      console.warn("Access forbidden (403)");

      if (window.location.pathname !== "/unauthorized") {
        window.location.href = "/unauthorized";
      }
    }

    return Promise.reject(error);
  }
);

export default api;

