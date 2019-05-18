import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.css";

const navBar = props => (
  <div className="Nav">
    <NavLink activeClassName="active" className="NavLink" to="/">
      Forms
    </NavLink>

    <NavLink activeClassName="active" className="NavLink" to="/scrape">
      Scrape
    </NavLink>
  </div>
);

export default navBar;
