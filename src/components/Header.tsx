import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Logo from '../assets/logo.png';

const StyledHeader = styled.header`
  ${props => props.theme.pageMaxWidth};
  display: grid;
  grid-template: 'logo nav' / 1fr 2fr;
  position: relative;
  padding: 3em 0 2em;
  transform-style: preserve-3d;

  @media (max-width: ${props => props.theme.breakMedium}) {
    grid-template:
      'logo'
      'nav';
    gap: 1rem;
    justify-items: center;
    padding: 2rem 0;
  }
`;

const StyledImg = styled.img`
  display: block;
  width: 100%;
  margin-bottom: -10%;

  @media (max-width: ${props => props.theme.breakMedium}) {
    width: 80%;
    margin: 0 auto;
    padding-left: 5%;
  }

  @media (max-width: ${props => props.theme.breakSmall}) {
    width: 95%;
  }
`;

const StyledNav = styled.div`
  justify-self: end;
  text-align: center;

  > span {
    display: inline-block;
  }

  @media (max-width: ${props => props.theme.breakMedium}) {
    justify-self: center;
  }
`;

const StyledNavLink = styled(Link)`
  margin-left: 2rem;
  text-decoration: none;
  transition: color 0.2s ease-out;

  &:hover {
    color: ${props => props.theme.coral};
  }

  @media (max-width: ${props => props.theme.breakMedium}) {
    margin: 0 1rem;
  }
`;

const Header = () => (
  <StyledHeader>
    <Link to="/">
      <StyledImg src={Logo} />
    </Link>
    <StyledNav>
      <span>
        <StyledNavLink to="/">reviews</StyledNavLink>
        <StyledNavLink to="/about">about</StyledNavLink>
      </span>
      <span>
        <StyledNavLink to="/scoring">scoring</StyledNavLink>
        <StyledNavLink to="/contact">contact</StyledNavLink>
      </span>
    </StyledNav>
  </StyledHeader>
);

export default Header;
