import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowIcon from '../assets/images/arrow-down.svg';

const StyledSort = styled.div`
  position: relative;
  border-left: 3px solid ${props => props.theme.coral};
  color: ${props => props.theme.coral};
  padding: 0.5em 1em;
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
  path: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Sort: React.FC<SortProps> = props => {
  const { path, onChange } = props;

  const getFromPath = () => {
    return path.split('/')[1];
  };

  const [sortBy, setSortBy] = useState(getFromPath());

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    onChange(e);
  };

  return (
    <StyledSort>
      <label>Sort: </label>
      <StyledSelect value={sortBy} onChange={handleChange}>
        <option value="">Score</option>
        <option value="coffee">Coffee</option>
        <option value="aesthetic">Aesthetic</option>
        <option value="seating">Seating</option>
      </StyledSelect>
      <StyledArrowIcon />
    </StyledSort>
  );
};

export default Sort;
