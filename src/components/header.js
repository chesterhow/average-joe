import React from "react";
import { Link } from "gatsby";

import logo from "../images/logo.svg";

const Header = () => (
  <header>
    <Link to="/">
      <img src={logo} alt="Average Joe" />
    </Link>
  </header>
);

export default Header;
