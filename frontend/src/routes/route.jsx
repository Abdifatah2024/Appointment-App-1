



import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

/* ================= PAGES ================= */
import Login from "../pages/user/Login";
import Users from "../pages/user/Users";
import Profile from "../pages/user/Profile";

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

/* ================= STAFF DEFAULT ================= */
function DashboardIndex() {
  const { user } = useSelector((s) => s.auth);

  // ✅ STAFF -> Employee dashboard
  if (user?.role === "STAFF") {
    return <EmployeeDashboard />;
  }

  // ✅ ADMIN -> main dashboard
  return <AppointmentDashboard />;
}

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
          // ✅ CHANGE: STAFF sees EmployeeDashboard here
          { index: true, element: <DashboardIndex /> },

          /* STAFF SHARED (3 items only in sidebar) */
          { path: "customers", element: <Customers /> },
          { path: "create-appointment", element: <CreateAppointment /> },

          // ✅ PROFILE (ADMIN + STAFF)
          { path: "profile", element: <Profile /> },

          /* ADMIN ONLY */
          {
            element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
            children: [
              { path: "users", element: <Users /> },
              { path: "services", element: <Services /> },
              { path: "pending-appointments", element: <PendingAppointments /> },
              { path: "approved-appointments", element: <ApprovedAppointments /> },
              { path: "completed-appointments", element: <CompletedAppointments /> },
            ],
          },
        ],
      },
    ],
  },

  /* ---------- EMPLOYEE (direct link, also allow STAFF) ---------- */
  {
    element: <ProtectedRoute allowedRoles={["USER", "ADMIN", "STAFF"]} />,
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
