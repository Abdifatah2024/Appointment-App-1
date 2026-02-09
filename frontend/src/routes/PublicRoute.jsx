// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// const PublicRoute = () => {
//   const { token } = useSelector((state) => state.auth);

//   if (token) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return <Outlet />;
// };

// export default PublicRoute;
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { token, user } = useSelector((state) => state.auth);

  if (token && user) {
    return user.role === "ADMIN"
      ? <Navigate to="/dashboard" replace />
      : <Navigate to="/dashboard/employee" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;

