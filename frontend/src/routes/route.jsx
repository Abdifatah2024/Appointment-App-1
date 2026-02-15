// import ProtectedRoute from "./ProtectedRoute";

// // Pages
// import Login from "../pages/user/Login";
// import Profile from "../pages/user/Profile";
// import Users from "../pages/user/Users";

// // ✅ customer pages (hubi in folder-ka run ahaantiis la yiraahdo "customer")
// import Customers from "../pages/customer/Customers";
// import CreateAppointment from "../pages/customer/CreateAppointment";
// import PendingAppointments from "../pages/customer/PendingAppointments";
// import ApprovedAppointments from "../pages/customer/ApprovedAppointments";
// import CompletedAppointments from "../pages/customer/CompletedAppointments";

// // ✅ services pages (hubi folder: "Service" vs "service")
// import Services from "../pages/Service/Services";

// // ✅ employee dashboard (hubi folder: "Employee" vs "employee")
// import EmployeeDashboard from "../pages/Employee/EmployeeDashboard";

// // Layouts
// import DashboardLayout from "../layouts/DashboardLayout";

// // Dashboard page
// import Dashboard from "../Components/Dashboard";
// import PublicAppointmentPage from "../pages/Public/PublicAppointmentPage";

// const systemRoutes = [
//   // ✅ PUBLIC
//   { path: "/", element: <Login /> },

//   // ✅ PROTECTED
//   {
//     element: (
//       <ProtectedRoute allowedRoles={["SUPERADMIN", "ADMIN", "STAFF", "USER"]} />
//     ),
//     children: [
//       {
//         path: "/dashboard",
//         element: <DashboardLayout />,
//         children: [
//           { index: true, element: <Dashboard /> },

//           // ✅ USER
//           { path: "profile", element: <Profile /> },
//           { path: "users", element: <Users /> },

//           // ✅ MANAGEMENT
//           { path: "customers", element: <Customers /> },
//           { path: "services", element: <Services /> },

//           // ✅ APPOINTMENTS
//           { path: "create-appointment", element: <CreateAppointment /> },
//           { path: "pending-appointments", element: <PendingAppointments /> },
//           { path: "approved-appointments", element: <ApprovedAppointments /> },
//           { path: "completed-appointments", element: <CompletedAppointments /> },
//           { path: "public-appointment", element: <PublicAppointmentPage/> },

//           // ✅ STAFF
//           { path: "employee", element: <EmployeeDashboard /> },
//         ],
//       },
//     ],
//   },
// ];

// export default systemRoutes;

import ProtectedRoute from "./ProtectedRoute";

// ================= USER PAGES =================
import Login from "../pages/user/Login";
import Profile from "../pages/user/Profile";
import Users from "../pages/user/Users";

// ================= CUSTOMER PAGES =================
import Customers from "../pages/customer/Customers";
import CreateAppointment from "../pages/customer/CreateAppointment";
import PendingAppointments from "../pages/customer/PendingAppointments";
import ApprovedAppointments from "../pages/customer/ApprovedAppointments";
import CompletedAppointments from "../pages/customer/CompletedAppointments";

// ================= SERVICE PAGES =================
import Services from "../pages/Service/Services";

// ================= EMPLOYEE =================
import EmployeeDashboard from "../pages/Employee/EmployeeDashboard";

// ================= PUBLIC =================
import PublicAppointmentPage from "../pages/Public/PublicAppointmentPage";

// ================= LAYOUT =================
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../Components/Dashboard";

const systemRoutes = [
  /* =====================================================
     🔓 PUBLIC ROUTES
  ===================================================== */
  {
    path: "/",
    element: <PublicAppointmentPage />, // ✅ FIRST PAGE
  },

  {
    path: "/login",
    element: <Login />, // ✅ LOGIN PAGE
  },

  /* =====================================================
     🔐 PROTECTED ROUTES
  ===================================================== */
  {
    element: (
      <ProtectedRoute
        allowedRoles={["SUPERADMIN", "ADMIN", "STAFF", "USER"]}
      />
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Dashboard /> },

          // ✅ USER
          { path: "profile", element: <Profile /> },
          { path: "users", element: <Users /> },

          // ✅ MANAGEMENT
          { path: "customers", element: <Customers /> },
          { path: "services", element: <Services /> },

          // ✅ APPOINTMENTS
          { path: "create-appointment", element: <CreateAppointment /> },
          { path: "pending-appointments", element: <PendingAppointments /> },
          { path: "approved-appointments", element: <ApprovedAppointments /> },
          { path: "completed-appointments", element: <CompletedAppointments /> },

          // ✅ STAFF
          { path: "employee", element: <EmployeeDashboard /> },
        ],
      },
    ],
  },
];

export default systemRoutes;

