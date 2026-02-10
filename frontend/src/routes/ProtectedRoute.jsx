// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = () => {
//   const { token } = useSelector((state) => state.auth);

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };
// ``
// export default ProtectedRoute;
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { token, user, loading } = useSelector((state) => state.auth);

  // ⏳ Wait until auth bootstrap finishes
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // 🔐 Not logged in
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // 🛑 Role-based protection
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;


