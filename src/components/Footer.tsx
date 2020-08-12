import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Logo from '../assets/images/logo.svg';

const StyledFooter = styled.footer`
  background: ${props => props.theme.coralPale};
  margin-top: 3rem;
  padding: 3rem 0 2rem;
`;

const StyledFooterContent = styled.div`
  ${props => props.theme.pageMaxWidth};
`;

const StyledFooterRow = styled.div`
  display: grid;
  grid-template:
    'logo list list'
    / auto max-content max-content;
  gap: 3rem;

  @media (max-width: ${props => props.theme.breakMedium}) {
    grid-template:
      'logo logo'
      'list list';
    gap: 2rem 0;
  }
`;

const StyledFooterLogo = styled.div`
  grid-area: logo;
`;

const StyledVerticalList = styled.div`
  display: flex;
  flex-direction: column;
  transition: color 0.2s ease-out;
`;

const StyledListHeading = styled.h6`
  margin-top: 0;
  color: ${props => props.theme.gold};
`;

const StyledAnchor = styled.a`
  grid-area: list;
  margin-top: 1rem;
  font-size: 0.8rem;
  text-decoration: none;
  transition: color 0.2s ease-out;

  &:hover {
    color: ${props => props.theme.coral};
  }
`;

const StyledNavLink = styled(Link)`
  margin-top: 1rem;
  font-size: 0.8rem;
  text-decoration: none;
  transition: color 0.2s ease-out;

  &:hover {
    color: ${props => props.theme.coral};
  }
`;

const StyledCopyright = styled.span`
  display: block;
  margin-top: 0.5rem;
  color: ${props => props.theme.grey};
  font-size: 0.7rem;
`;

const Footer: React.FC = () => {
  const date = new Date();

  return (
    <StyledFooter>
      <StyledFooterContent>
        <StyledFooterRow>
          <StyledFooterLogo>
            <Link to="/">
              <Logo />
            </Link>
            <StyledCopyright>
              &copy; Average Joe, {date.getFullYear()}
            </StyledCopyright>
          </StyledFooterLogo>

          <StyledVerticalList>
            <StyledListHeading>navigation</StyledListHeading>
            <StyledNavLink to="/">reviews</StyledNavLink>
            <StyledNavLink to="/about">about</StyledNavLink>
            <StyledNavLink to="/scoring">scoring</StyledNavLink>
            <StyledNavLink to="/contact">contact</StyledNavLink>
          </StyledVerticalList>
          <StyledVerticalList>
            <StyledListHeading>contact us</StyledListHeading>
            <StyledAnchor
              href="https://www.instagram.com/averagejoe.reviews/"
              target="_blank"
              rel="noopener noreferrer"
            >
              instagram
            </StyledAnchor>
            <StyledAnchor
              href="https://www.facebook.com/averagejoe.sg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              facebook
            </StyledAnchor>
            <StyledAnchor href="mailto:ajreviews.sg@gmail.com">
              email
            </StyledAnchor>
          </StyledVerticalList>
        </StyledFooterRow>
      </StyledFooterContent>
    </StyledFooter>
  );
};

export default Footer;
