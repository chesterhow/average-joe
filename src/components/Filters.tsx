import React, { useRef } from 'react';
import styled from 'styled-components';

const StyledFilters = styled.div`
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  border-left: 3px solid ${props => props.theme.coral};

  @media (max-width: ${props => props.theme.breakSmall}) {
    border-left: none;
    border-bottom: 3px solid ${props => props.theme.coral};
  }
`;

const StyledCheckbox = styled.label`
  display: inline-block;
  position: relative;
  padding-right: 1rem;
  line-height: 1;
  cursor: pointer;
  white-space: nowrap;

  span {
    padding-left: 0.4rem;
    vertical-align: middle;

    &:before {
      content: '✓';
      position: absolute;
      top: 0.08rem;
      left: 0.22rem;
      font-family: 'Lucida Sans Unicode', 'Arial Unicode MS', Arial;
      font-size: 0.8rem;
      color: ${props => props.theme.coral};
      transform: scale(0);
      transition: all 0.2s;
      opacity: 0;
    }
  }

  input {
    display: inline-block;
    appearance: none;
    margin: 0;
    height: 0.9rem;
    width: 0.9rem;
    border: 1px solid ${props => props.theme.grey};
    vertical-align: middle;
    cursor: pointer;

    &:hover {
      border: 1px solid ${props => props.theme.coral};
    }

    &:focus {
      outline: none;
    }

    &:checked + span:before {
      opacity: 1;
      transform: scale(1);
    }
  }

  :last-child {
    padding-right: 0;
  }
`;

interface FiltersProps {
  onChange: (reviewed: boolean, wifi: boolean, food: boolean) => void;
}

const Filters: React.FC<FiltersProps> = props => {
  const { onChange } = props;

  const reviewedCheckbox = useRef<HTMLInputElement>(null);
  const wifiCheckbox = useRef<HTMLInputElement>(null);
  const foodCheckbox = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    onChange(
      reviewedCheckbox.current?.checked ?? false,
      wifiCheckbox.current?.checked ?? false,
      foodCheckbox.current?.checked ?? false
    );
  };

  return (
    <StyledFilters>
      <StyledCheckbox htmlFor="reviewed">
        <input
          id="reviewed"
          type="checkbox"
          ref={reviewedCheckbox}
          onChange={handleToggle}
        />
        <span>Reviewed</span>
      </StyledCheckbox>
      <StyledCheckbox htmlFor="wifi">
        <input
          id="wifi"
          type="checkbox"
          ref={wifiCheckbox}
          onChange={handleToggle}
        />
        <span>Wi-fi</span>
      </StyledCheckbox>
      <StyledCheckbox htmlFor="food">
        <input
          id="food"
          type="checkbox"
          ref={foodCheckbox}
          onChange={handleToggle}
        />
        <span>Food</span>
      </StyledCheckbox>
    </StyledFilters>
  );
};

export default Filters;
