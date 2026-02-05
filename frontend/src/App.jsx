import { useRoutes } from "react-router-dom";
import systemRoutes from "./routes/route";


function App() {
  const element = useRoutes(systemRoutes);
  return element;
}

export default App;
