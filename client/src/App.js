import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./pages/routes";
import { useAuth } from "./hooks/authHook";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}>
      <BrowserRouter>
        <div className="container">{routes}</div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
