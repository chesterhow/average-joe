import React from 'react';
import styled from 'styled-components';
import ArrowIcon from '../assets/images/arrow-down.svg';

const StyledSort = styled.div`
  position: relative;
  padding: 0.5rem 1rem;
  border-left: 3px solid ${props => props.theme.coral};
  color: ${props => props.theme.coral};

  @media (max-width: ${props => props.theme.breakSmall}) {
    border-left: none;
    text-align: right;
  }
`;

const StyledSelect = styled.select`
  padding-right: 1.2rem;
  color: ${props => props.theme.coral};
  border: none;
  background: none;
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const StyledArrowIcon = styled(ArrowIcon)`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  margin-left: -0.8rem;
  pointer-events: none;
  height: 6px;
`;

interface SortProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Sort: React.FC<SortProps> = props => {
  const { onChange } = props;

  return (
    <StyledSort>
      <label htmlFor="sort">Sort: </label>
      <StyledSelect onChange={onChange} id="sort">
        <option value="latest">Latest</option>
        <option value="near me">Near me</option>
        <option value="coffee">Coffee</option>
        <option value="aesthetic">Aesthetic</option>
        <option value="seating">Seating</option>
      </StyledSelect>
      <StyledArrowIcon />
    </StyledSort>
  );
};

export default Sort;
