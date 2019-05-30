import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.css";

const navBar = props => (
  <div className="Nav">
    <NavLink activeClassName="active" className="NavLink" exact={true} to="/">
      Templates
    </NavLink>

    <NavLink
      activeClassName="active"
      id="right"
      className="NavLink"
      to="/scrape"
    >
      Scrape
    </NavLink>
  </div>
);

export default navBar;
