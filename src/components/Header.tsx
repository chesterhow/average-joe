import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Logo from '../assets/images/logo.svg';

const Header = () => (
  <header>
    <Link to="/">
      <Logo />
    </Link>
    <span>reviews</span>
    <span>about</span>
    <span>contact</span>
  </header>
);

export default Header;
