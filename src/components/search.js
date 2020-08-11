import React from 'react';
import styled from 'styled-components';

import search from '../assets/images/search.svg';

const StyledInput = styled.input`
  display: inline-block;
  width: 40%;
  max-width: 15rem;
  min-width: 12rem;
  padding: 0.75rem;
  padding-right: 2rem;
  border: none;
  background: ${props => props.theme.coral} url(${search}) no-repeat right
    0.8rem center;
  color: ${props => props.theme.goldPale};
  font-size: 0.8rem;
  font-weight: 500;

  ::placeholder {
    color: ${props => props.theme.goldPale};
  }
`;

const Search = () => <StyledInput type="text" placeholder="Search by name" />;

export default Search;
