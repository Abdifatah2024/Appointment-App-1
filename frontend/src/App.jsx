import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import systemRoutes from "./routes/route";
import { fetchMe, stopLoading } from "./Redux/slices/userSlices/authSlice";

export default function App() {
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchMe());
    } else {
      dispatch(stopLoading());
    }
  }, [dispatch, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600 font-semibold">
        Loading...
      </div>
    );
  }

  return useRoutes(systemRoutes);
}
