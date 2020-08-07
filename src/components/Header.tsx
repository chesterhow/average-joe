import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Logo from '../assets/images/logo.svg';

const StyledHeader = styled.header`
  ${props => props.theme.pageMaxWidth};
  display: grid;
  grid-template-columns: auto 1fr;
  position: relative;
  height: 145px;
  padding: 3em 0;
  transform-style: preserve-3d;
`;

const StyledNav = styled.div`
  justify-self: end;
`;

const StyledNavLink = styled(Link)`
  margin-left: 2em;
  text-decoration: none;
`;

const Header = () => (
  <StyledHeader>
    <Link to="/">
      <Logo />
    </Link>
    <StyledNav>
      <StyledNavLink to="/">reviews</StyledNavLink>
      <StyledNavLink to="/about">about</StyledNavLink>
      <StyledNavLink to="/scoring">scoring</StyledNavLink>
      <StyledNavLink to="/contact">contact</StyledNavLink>
    </StyledNav>
  </StyledHeader>
);

export default Header;
