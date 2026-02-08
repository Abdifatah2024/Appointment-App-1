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
import Login from "../pages/user/Login";
import Users from "../pages/user/Users";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Customers from "../pages/customer/Customers";
import Services from "../pages/Service/Services";
import CreateAppointment from "../pages/customer/CreateAppointment";
import PendingAppointments from "../pages/customer/PendingAppointments.jsx";
import ApprovedAppointments from "../pages/customer/AprovedAppointments.jsx";
import AppointmentDashboard from "../Components/Dashboard.jsx";

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
        path: "/Dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "users", element: <Users /> },
          { path: "customers", element: <Customers /> },
          { path: "services", element: <Services /> },
          { path: "create-appointment", element: <CreateAppointment /> },
          { path: "pending-appointments", element: <PendingAppointments /> },
          { path: "aproved-appointments", element: <ApprovedAppointments /> },
          { path: "Dashboard", element: <AppointmentDashboard/> },



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
