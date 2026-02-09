// // import { Navigate, Outlet } from "react-router-dom";
// // import { useSelector } from "react-redux";

// // const ProtectedRoute = () => {
// //   const { token } = useSelector((state) => state.auth);

// //   if (!token) {
// //     return <Navigate to="/" replace />;
// //   }

// //   return <Outlet />;
// // };

// // export default ProtectedRoute;
// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ allowedRoles }) => {
//   const { token, user } = useSelector((state) => state.auth);

//   if (!token || !user) {
//     return <Navigate to="/" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return user.role === "USER"
//       ? <Navigate to="/dashboard/employee" replace />
//       : <Navigate to="/dashboard" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { token, user } = useSelector((state) => state.auth);

  /* ======================
     AUTH CHECK
  ====================== */
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  /* ======================
     ADMIN OVERRIDE (IMPORTANT)
     Admin can access ANY path
  ====================== */
  if (user.role === "ADMIN" || user.role === "SUPERADMIN") {
    return <Outlet />;
  }

  /* ======================
     ROLE-BASED CHECK
  ====================== */
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // USER → employee dashboard
    if (user.role === "USER") {
      return <Navigate to="/dashboard/employee" replace />;
    }

    // STAFF or others → main dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;



