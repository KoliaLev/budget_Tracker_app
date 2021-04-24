import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./pages/routes";
import { useAuth } from "./hooks/authHook";
import { AuthContext } from "./context/AuthContext";
import { Provider } from "react-redux";
import store from "./redux/redux-store";

function App() {
  const { token, login, logout, userId, email } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider value={{ token, login, logout, userId, email, isAuthenticated }}>
      <BrowserRouter>
        {/* <Provider store={store}> */}
        <div className="container">{routes}</div>
        {/* </Provider> */}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
