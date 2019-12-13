import React from "react";
import styled from "styled-components";

import Select from "./select";

const locationOptions = [
  {
    id: 1,
    value: "near",
    label: "Near me"
  }, {
    id: 2,
    value: "central",
    label: "Central"
  }, {
    id: 3,
    value: "north",
    label: "North"
  }, {
    id: 4,
    value: "south",
    label: "South"
  }, {
    id: 5,
    value: "east",
    label: "East"
  }, {
    id: 6,
    value: "west",
    label: "West"
  }
];

const sortOptions = [
  {
    id: 1,
    value: "overall",
    label: "Overall score"
  }, {
    id: 2,
    value: "coffee",
    label: "Best coffee"
  }, {
    id: 3,
    value: "aesthetic",
    label: "Best aesthetic"
  }, {
    id: 4,
    value: "seating",
    label: "Most seating"
  }, {
    id: 5,
    value: "price",
    label: "Lowest price"
  }
];

const StyledFilters = styled.div`
  display: block;
  width: 100%;
  padding: 0 1rem;
  border-bottom: 2px solid ${props => props.theme.goldPale};

  * {
    color: ${props => props.theme.goldPale};
    font-size: 0.8rem;
    font-weight: 500;
  }
`;

const StyledCheckbox =styled.div`
  display: inline-block;
  cursor: pointer;
  user-select: none;
  padding: 0 1rem;
  
  input {
    display: inline-block;
    appearance: none;
    margin: 0;
    padding: 0.45rem;
    background-color: ${props => props.theme.goldPale};
    cursor: pointer;
    vertical-align: middle;

    :checked {
      box-shadow: inset 0 0 0 3px ${props => props.theme.goldPale};
      background-color: ${props => props.theme.goldLight};
    }
  }

  label {
    display: inline-block;
    cursor: pointer;
    padding: 1rem 0 1rem 0.3rem;
    vertical-align: middle;
  }

  :last-child {
    padding-left: 0;
  }
`;

const Filters = () => (
  <StyledFilters>
    <Select items={locationOptions} />
    <Select items={sortOptions} />
    <StyledCheckbox>
      <input type="checkbox" id="wifi" name="wifi" />
      <label htmlFor="wifi">Wi-fi</label>
    </StyledCheckbox>
    <StyledCheckbox>
      <input type="checkbox" id="food" name="food" />
      <label htmlFor="food">Food</label>
    </StyledCheckbox>
  </StyledFilters>
);

export default Filters;
