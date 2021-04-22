import { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
    history.push("/");
  };
  return (
    <nav>
      <div class="nav-wrapper grey lighten-1">
        <span href="#" class="brand-logo">
          Budget Tracker App
        </span>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <a href="collapsible.html" onClick={logoutHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
