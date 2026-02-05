// import Login from "../pages/Login";
// import ProtectedRoute from "./ProtectedRoute";
// import PublicRoute from "./PublicRoute";
// import DashboardLayout from "../layouts/DashboardLayout";
// import Users from "../pages/Users";
// import React from "react";

// const DashboardHome = () => <h2>Dashboard Home</h2>;
// const NotFound = () => <h2>404 - Page Not Found</h2>;

// const systemRoutes = [
//   // ================= PUBLIC =================
//   {
//     element: <PublicRoute />,
//     children: [
//       {
//         path: "/",
//         element: <Login />,
//       },
//     ],
//   },

//   // ================= PROTECTED =================
//   {
//     element: <ProtectedRoute />,
//     children: [
//       {
//         path: "/dashboard",
//         element: <DashboardLayout />,
//         children: [
//           { index: true, element: <DashboardHome /> },
//           { path: "users", element: <Users /> },
//         ],
//       },
//     ],
//   },

//   // ================= FALLBACK =================
//   {
//     path: "*",
//     element: <NotFound />,
//   },
// ];

// export default systemRoutes;

import React from "react";
import Login from "../pages/Login";
import Users from "../pages/Users";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

/* ================================
   SIMPLE PAGES
================================ */
const DashboardHome = () => (
  <div className="text-xl font-semibold">
    Dashboard Home
  </div>
);

const NotFound = () => (
  <div className="text-center text-xl font-semibold">
    404 - Page Not Found
  </div>
);

/* ================================
   ROUTES
================================ */
const systemRoutes = [
  /* ---------- PUBLIC ROUTES ---------- */
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },

  /* ---------- PROTECTED ROUTES ---------- */
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "users", element: <Users /> },
        ],
      },
    ],
  },

  /* ---------- FALLBACK ---------- */
  {
    path: "*",
    element: <NotFound />,
  },
];

export default systemRoutes;
