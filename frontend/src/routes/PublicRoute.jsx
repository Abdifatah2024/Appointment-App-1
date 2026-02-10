// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// const PublicRoute = () => {
//   const { token, user } = useSelector((state) => state.auth);

//   if (token && user) {
//     return user.role === "ADMIN"
//       ? <Navigate to="/dashboard" replace />
//       : <Navigate to="/dashboard/employee" replace />;
//   }

//   return <Outlet />;
// };

// export default PublicRoute;


import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { token, user, loading } = useSelector((state) => state.auth);

  // ⏳ Show loading instead of white page
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (token && user) {
    if (user.role === "ADMIN" || user.role === "SUPERADMIN") {
      return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/dashboard/employee" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
