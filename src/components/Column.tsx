import React from 'react';
import styled, { css } from 'styled-components';

type StyledWrapperProps = {
  left: boolean;
};

const StyledWrapper = styled.div<StyledWrapperProps>`
  @media (min-width: ${props => props.theme.breakSmall}) {
    display: inline-block;
    width: 50%;
    vertical-align: top;

    ${props =>
      props.left
        ? css`
            padding-right: 0.7rem;
          `
        : css`
            margin-top: 2rem;
            padding-left: 0.7rem;
          `};
  }
`;

interface ColumnProps {
  left: boolean;
}

const Column: React.FC<ColumnProps> = props => {
  const { left, children } = props;

  return <StyledWrapper left={left}>{children}</StyledWrapper>;
};

export default Column;
