import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  @media (min-width: ${props => props.theme.breakSmall}) {
    columns: 2;
    column-gap: 1rem;

    * {
      margin: 0 !important;
    }

    p {
      display: inline-block;
      width: 100%;
      margin-bottom: 1rem !important;
    }
  }
`;

const Masonry: React.FC = props => {
  const { children } = props;

  return <StyledWrapper>{children}</StyledWrapper>;
};

export default Masonry;
