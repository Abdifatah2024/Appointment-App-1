// // // import React from "react";

// // // import Login from "../pages/user/Login";
// // // import Users from "../pages/user/Users";
// // // import Customers from "../pages/customer/Customers";
// // // import Services from "../pages/Service/Services";
// // // import CreateAppointment from "../pages/customer/CreateAppointment";
// // // import PendingAppointments from "../pages/customer/PendingAppointments";
// // // import ApprovedAppointments from "../pages/customer/AprovedAppointments";
// // // import AppointmentDashboard from "../Components/Dashboard";

// // // import PublicRoute from "./PublicRoute";
// // // import ProtectedRoute from "./ProtectedRoute";
// // // import DashboardLayout from "../layouts/DashboardLayout";
// // // import EmployeeDashboard from "../pages/Employee/EmployeeDashboard";

// // // /* ================================
// // //    FALLBACK PAGE
// // // ================================ */
// // // const NotFound = () => (
// // //   <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
// // //     404 - Page Not Found
// // //   </div>
// // // );

// // // /* ================================
// // //    ROUTES CONFIG
// // // ================================ */
// // // const systemRoutes = [
// // //   /* ---------- PUBLIC ---------- */
// // //   {
// // //     element: <PublicRoute />,
// // //     children: [
// // //       {
// // //         path: "/",
// // //         element: <Login />,
// // //       },
// // //     ],
// // //   },

// // //   /* ---------- PROTECTED ---------- */
// // //   {
// // //     element: <ProtectedRoute />,
// // //     children: [
// // //       {
// // //         path: "/dashboard",
// // //         element: <DashboardLayout />,
// // //         children: [
// // //           /* ✅ DEFAULT DASHBOARD */
// // //           {
// // //             index: true,
// // //             element: <AppointmentDashboard />,
// // //           },

// // //           /* OTHER PAGES */
// // //           { path: "users", element: <Users /> },
// // //           { path: "customers", element: <Customers /> },
// // //           { path: "services", element: <Services /> },
// // //           { path: "create-appointment", element: <CreateAppointment /> },
// // //           { path: "pending-appointments", element: <PendingAppointments /> },
// // //           { path: "approved-appointments", element: <ApprovedAppointments /> },
// // //           {path: "EmployeeDashboard", element: <EmployeeDashboard />},
// // //         ],
// // //       },
// // //     ],
// // //   },

// // //   /* ---------- FALLBACK ---------- */
// // //   {
// // //     path: "*",
// // //     element: <NotFound />,
// // //   },
// // // ];

// // // export default systemRoutes;
// // import React from "react";

// // import Login from "../pages/user/Login";
// // import Users from "../pages/user/Users";
// // import Customers from "../pages/customer/Customers";
// // import Services from "../pages/Service/Services";
// // import CreateAppointment from "../pages/customer/CreateAppointment";
// // import PendingAppointments from "../pages/customer/PendingAppointments";
// // import ApprovedAppointments from "../pages/customer/AprovedAppointments";
// // import AppointmentDashboard from "../Components/Dashboard";
// // import EmployeeDashboard from "../pages/Employee/EmployeeDashboard";

// // import PublicRoute from "./PublicRoute";
// // import ProtectedRoute from "./ProtectedRoute";
// // import DashboardLayout from "../layouts/DashboardLayout";

// // /* ================================
// //    FALLBACK
// // ================================ */
// // const NotFound = () => (
// //   <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
// //     404 - Page Not Found
// //   </div>
// // );

// // const systemRoutes = [
// //   /* ---------- PUBLIC ---------- */
// //   {
// //     element: <PublicRoute />,
// //     children: [
// //       { path: "/", element: <Login /> },
// //     ],
// //   },

// //   /* ---------- ADMIN ---------- */
// //   {
// //     element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
// //     children: [
// //       {
// //         path: "/dashboard",
// //         element: <DashboardLayout />,
// //         children: [
// //           { index: true, element: <AppointmentDashboard /> },
// //           { path: "users", element: <Users /> },
// //           { path: "customers", element: <Customers /> },
// //           { path: "services", element: <Services /> },
// //           { path: "create-appointment", element: <CreateAppointment /> },
// //           { path: "pending-appointments", element: <PendingAppointments /> },
// //           { path: "approved-appointments", element: <ApprovedAppointments /> },
// //         ],
// //       },
// //     ],
// //   },

// //   /* ---------- USER ---------- */
// //   {
// //     element: <ProtectedRoute allowedRoles={["USER"]} />,
// //     children: [
// //       {
// //         path: "/dashboard/employee",
// //         element: <DashboardLayout />,
// //         children: [{ index: true, element: <EmployeeDashboard /> }],
// //       },
// //     ],
// //   },

// //   /* ---------- FALLBACK ---------- */
// //   { path: "*", element: <NotFound /> },
// // ];

// // export default systemRoutes;
// import React from "react";

// import Login from "../pages/user/Login";
// import Users from "../pages/user/Users";
// import Customers from "../pages/customer/Customers";
// import Services from "../pages/Service/Services";
// import CreateAppointment from "../pages/customer/CreateAppointment";
// import PendingAppointments from "../pages/customer/PendingAppointments";
// import ApprovedAppointments from "../pages/customer/AprovedAppointments";
// import AppointmentDashboard from "../Components/Dashboard";
// import EmployeeDashboard from "../pages/Employee/EmployeeDashboard";

// import PublicRoute from "./PublicRoute";
// import ProtectedRoute from "./ProtectedRoute";
// import DashboardLayout from "../layouts/DashboardLayout";

// /* ================================
//    FALLBACK
// ================================ */
// const NotFound = () => (
//   <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
//     404 - Page Not Found
//   </div>
// );

// const systemRoutes = [
//   /* ---------- PUBLIC ---------- */
//   {
//     element: <PublicRoute />,
//     children: [{ path: "/", element: <Login /> }],
//   },

//   /* ---------- DASHBOARD (ADMIN + STAFF) ---------- */
//   {
//     element: <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]} />,
//     children: [
//       {
//         path: "/dashboard",
//         element: <DashboardLayout />,
//         children: [
//           { index: true, element: <AppointmentDashboard /> },

//           /* SHARED (ADMIN + STAFF) */
//           { path: "customers", element: <Customers /> },
//           { path: "create-appointment", element: <CreateAppointment /> },
     

//           /* ADMIN ONLY */
//           {
//             element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
//             children: [
//               { path: "users", element: <Users /> },
//               { path: "services", element: <Services /> },
//                    { path: "pending-appointments", element: <PendingAppointments /> },
//           { path: "approved-appointments", element: <ApprovedAppointments /> },
//             ],
//           },
//         ],
//       },
//     ],
//   },

//   /* ---------- USER (EMPLOYEE) ---------- */
//   {
//     element: <ProtectedRoute allowedRoles={["USER"]} />,
//     children: [
//       {
//         path: "/dashboard/employee",
//         element: <DashboardLayout />,
//         children: [{ index: true, element: <EmployeeDashboard /> }],
//       },
//     ],
//   },

//   /* ---------- FALLBACK ---------- */
//   { path: "*", element: <NotFound /> },
// ];

// export default systemRoutes;

import React from "react";

/* ================= PAGES ================= */
import Login from "../pages/user/Login";
import Users from "../pages/user/Users";
import Customers from "../pages/customer/Customers";
import Services from "../pages/Service/Services";
import CreateAppointment from "../pages/customer/CreateAppointment";
import PendingAppointments from "../pages/customer/PendingAppointments";
import ApprovedAppointments from "../pages/customer/AprovedAppointments";
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

          /* ADMIN ONLY */
          {
            element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
            children: [
              { path: "users", element: <Users /> },
              { path: "services", element: <Services /> },
              { path: "pending-appointments", element: <PendingAppointments /> },
              { path: "approved-appointments", element: <ApprovedAppointments /> },
            ],
          },
        ],
      },
    ],
  },

  /* ---------- EMPLOYEE ---------- */
  {
    element: <ProtectedRoute allowedRoles={["USER"]} />,
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


