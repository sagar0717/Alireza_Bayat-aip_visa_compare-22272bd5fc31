import React from "react";
import "./navbar.css";

import { Link, NavLink } from "react-router-dom";
//sfc stateless Functional Component
const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="./">
        Visa Compare
      </a>
      <div>
        <NavLink to="/addVisaDetail">
          <button className="btn btn-outline-warning">Add Visa Details</button>
        </NavLink>
        {/* <NavLink to="/visatypes">
          <button className="btn btn-outline-warning">Visa Types</button>
        </NavLink>
        <NavLink to="/countries">
          <button className="btn btn-outline-warning">Countries</button>
        </NavLink> */}
        {!user && (
          <React.Fragment>
            <NavLink to="/register">
              <button className="btn btn-outline-warning">Register</button>
            </NavLink>
            <NavLink to="/login">
              <button className="btn btn-outline-warning">Log in</button>
            </NavLink>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <NavLink to="/profile">
              <button className="btn btn-outline-success">
                Hi! {user.userName}
              </button>
            </NavLink>
            <NavLink to="/logout">
              <button className="btn btn-outline-warning">Logout</button>
            </NavLink>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
