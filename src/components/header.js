import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import logo from "../images/logo.svg";

const StyledImg = styled.img`
  display: block;
  height: 4rem;
  margin: 2rem auto 0;
  transition: all 0.2s ease-out;

  :hover {
    opacity: 60%;
  }
`;

const Header = () => (
  <header>
    <Link to="/">
      <StyledImg src={logo} alt="Average Joe" />
    </Link>
  </header>
);

export default Header;
