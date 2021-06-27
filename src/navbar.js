import ReactTooltip from "react-tooltip";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <ReactTooltip />
          <li data-tip="Home Page" className="nav-item">
            <NavLink exact className="nav-link" activeClassName="active" to="/">
              Home
            </NavLink>
          </li>
          <li data-tip="Create new user" className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/createaccount"
            >
              Create Account
            </NavLink>
          </li>
          <li data-tip="Login to the bank" className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/login">
              Login
            </NavLink>
          </li>
          <li data-tip="Deposit money" className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/deposit"
            >
              Deposit
            </NavLink>
          </li>
          <li data-tip="Withdraw money" className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/withdraw"
            >
              Withdraw
            </NavLink>
          </li>
          <li data-tip="Show all accounts" className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/alldata"
            >
              All Data
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
