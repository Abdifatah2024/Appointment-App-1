// import React from "react";

// /* ================= PAGES ================= */
// import Login from "../pages/user/Login";
// import Users from "../pages/user/Users";
// import Customers from "../pages/customer/Customers";
// import Services from "../pages/Service/Services";
// import CreateAppointment from "../pages/customer/CreateAppointment";
// import PendingAppointments from "../pages/customer/PendingAppointments";

// // ⚠️ Hubi magaca file-ka: AprovedAppointments vs ApprovedAppointments
// import ApprovedAppointments from "../pages/customer/AprovedAppointments";

// import CompletedAppointments from "../pages/customer/CompletedAppointments";

// import AppointmentDashboard from "../Components/Dashboard";
// import EmployeeDashboard from "../pages/Employee/EmployeeDashboard";

// /* ================= ROUTE GUARDS ================= */
// import PublicRoute from "./PublicRoute";
// import ProtectedRoute from "./ProtectedRoute";
// import DashboardLayout from "../layouts/DashboardLayout";

// /* ================= FALLBACK ================= */
// const NotFound = () => (
//   <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
//     404 - Page Not Found (Page-kan lama helin)
//   </div>
// );

// const Unauthorized = () => (
//   <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-red-600">
//     You are not authorized to view this page
//   </div>
// );

// /* ================= ROUTES ================= */
// const systemRoutes = [
//   /* ---------- PUBLIC ---------- */
//   {
//     element: <PublicRoute />,
//     children: [{ path: "/", element: <Login /> }],
//   },

//   /* ---------- ADMIN + STAFF DASHBOARD ---------- */
//   {
//     element: <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]} />,
//     children: [
//       {
//         path: "/dashboard",
//         element: <DashboardLayout />,
//         children: [
//           { index: true, element: <AppointmentDashboard /> },

//           /* SHARED */
//           { path: "customers", element: <Customers /> },
//           { path: "create-appointment", element: <CreateAppointment /> },

//           /* ADMIN ONLY */
//           {
//             element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
//             children: [
//               { path: "users", element: <Users /> },
//               { path: "services", element: <Services /> },
//               { path: "pending-appointments", element: <PendingAppointments /> },
//               { path: "approved-appointments", element: <ApprovedAppointments /> },

//               // ✅ NEW: COMPLETED
//               { path: "completed-appointments", element: <CompletedAppointments /> },
//             ],
//           },
//         ],
//       },
//     ],
//   },

//   /* ---------- EMPLOYEE ---------- */
//   {
//     element: <ProtectedRoute allowedRoles={["USER", "ADMIN"]} />,
//     children: [
//       {
//         path: "/dashboard/employee",
//         element: <DashboardLayout />,
//         children: [{ index: true, element: <EmployeeDashboard /> }],
//       },
//     ],
//   },

//   /* ---------- UNAUTHORIZED ---------- */
//   { path: "/unauthorized", element: <Unauthorized /> },

//   /* ---------- FALLBACK ---------- */
//   { path: "*", element: <NotFound /> },
// ];

// export default systemRoutes;

import React from "react";

/* ================= PAGES ================= */
import Login from "../pages/user/Login";
import Users from "../pages/user/Users";
import Profile from "../pages/user/Profile"; // ✅ NEW

import Customers from "../pages/customer/Customers";
import Services from "../pages/Service/Services";
import CreateAppointment from "../pages/customer/CreateAppointment";
import PendingAppointments from "../pages/customer/PendingAppointments";

// ⚠️ Hubi magaca file-ka: AprovedAppointments vs ApprovedAppointments
import ApprovedAppointments from "../pages/customer/AprovedAppointments";
import CompletedAppointments from "../pages/customer/CompletedAppointments";

import AppointmentDashboard from "../Components/Dashboard";
import EmployeeDashboard from "../pages/Employee/EmployeeDashboard";

/* ================= ROUTE GUARDS ================= */
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

/* ================= FALLBACK ================= */
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
    404 - Page Not Found (Page-kan lama helin)
  </div>
);

const Unauthorized = () => (
  <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-red-600">
    You are not authorized to view this page
  </div>
);

/* ================= ROUTES ================= */
const systemRoutes = [
  /* ---------- PUBLIC ---------- */
  {
    element: <PublicRoute />,
    children: [{ path: "/", element: <Login /> }],
  },

  /* ---------- ADMIN + STAFF DASHBOARD ---------- */
  {
    element: <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]} />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <AppointmentDashboard /> },

          /* SHARED */
          { path: "customers", element: <Customers /> },
          { path: "create-appointment", element: <CreateAppointment /> },

          // ✅ NEW: PROFILE (ADMIN + STAFF)
          { path: "profile", element: <Profile /> },

          /* ADMIN ONLY */
          {
            element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
            children: [
              { path: "users", element: <Users /> },
              { path: "services", element: <Services /> },
              { path: "pending-appointments", element: <PendingAppointments /> },
              { path: "approved-appointments", element: <ApprovedAppointments /> },

              // ✅ COMPLETED
              { path: "completed-appointments", element: <CompletedAppointments /> },
            ],
          },
        ],
      },
    ],
  },

  /* ---------- EMPLOYEE ---------- */
  {
    element: <ProtectedRoute allowedRoles={["USER", "ADMIN"]} />,
    children: [
      {
        path: "/dashboard/employee",
        element: <DashboardLayout />,
        children: [{ index: true, element: <EmployeeDashboard /> }],
      },
    ],
  },

  /* ---------- UNAUTHORIZED ---------- */
  { path: "/unauthorized", element: <Unauthorized /> },

  /* ---------- FALLBACK ---------- */
  { path: "*", element: <NotFound /> },
];

export default systemRoutes;
