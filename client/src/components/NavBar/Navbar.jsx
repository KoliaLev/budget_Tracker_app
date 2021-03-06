import { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import style from "./Navbar.module.css";

const NavBar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const user = auth.email;

  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <nav>
      <div className="nav-wrapper grey lighten-1">
        <span className="brand-logo">Budget Tracker</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <span>{user}</span>
          </li>
          <li>
            <a href="collapsible.html" onClick={logoutHandler}>
              Exit
            </a>
          </li>
        </ul>
        <a id={style.exit} href="collapsible.html" onClick={logoutHandler}>
          Exit
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
