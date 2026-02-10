// import { useRoutes } from "react-router-dom";
// import systemRoutes from "./routes/route";


// function App() {
//   const element = useRoutes(systemRoutes);
//   return element;
// }

// export default App;
import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import systemRoutes from "./routes/route";
import { fetchMe, stopLoading } from "./Redux/slices/userSlices/authSlice";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  // 🔑 AUTH BOOTSTRAP (THIS WAS MISSING)
  useEffect(() => {
    if (token) {
      dispatch(fetchMe());
    } else {
      dispatch(stopLoading());
    }
  }, [dispatch, token]);

  const element = useRoutes(systemRoutes);
  return element;
}

export default App;

