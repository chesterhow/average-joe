import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 3em 0;
  ${props => props.theme.pageMaxWidth};
  position: relative;
  height: 145px;
  transform-style: preserve-3d;
`;

const StyledNav = styled.div`
  justify-self: end;
`;

const StyledNavLink = styled(Link)`
  margin-left: 2em;
  text-decoration: none;
`;

import Logo from '../assets/images/logo.svg';

const Header = () => (
  <StyledHeader>
    <Link to="/">
      <Logo />
    </Link>
    <StyledNav>
      <StyledNavLink to="/">reviews</StyledNavLink>
      <StyledNavLink to="/about">about</StyledNavLink>
      <StyledNavLink to="/">contact</StyledNavLink>
    </StyledNav>
  </StyledHeader>
);

export default Header;
