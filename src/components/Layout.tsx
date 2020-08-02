/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';

import Header from './Header';
import theme from '../styles/theme';
import GlobalStyle from '../styles/global-styles';

const Parallax = styled.div`
  min-height: 100vh;
  perspective: 1px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Parallax>
          <Header />
          {children}
          {/* <main></main> */}
          <footer></footer>
        </Parallax>
      </ThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
