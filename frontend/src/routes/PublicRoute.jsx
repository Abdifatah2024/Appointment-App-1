// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// const PublicRoute = () => {
//   const { token, user, loading } = useSelector((state) => state.auth);

//   // ⏳ Show loading instead of white page
//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (token && user) {
//     if (user.role === "ADMIN" || user.role === "SUPERADMIN") {
//       return <Navigate to="/dashboard" replace />;
//     }

//     return <Navigate to="/dashboard/employee" replace />;
//   }

//   return <Outlet />;
// };

// export default PublicRoute;
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { token, user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (token && user) {
    // ✅ ADMIN + STAFF → same dashboard
    if (["ADMIN", "SUPERADMIN", "STAFF"].includes(user.role)) {
      return <Navigate to="/dashboard" replace />;
    }

    // ✅ ONLY real USER goes to employee dashboard
    return <Navigate to="/dashboard/employee" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;

