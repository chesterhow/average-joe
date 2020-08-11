import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';
import GlobalStyle from '../styles/global-styles';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <div data-scroll-container>{children}</div>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Layout;
