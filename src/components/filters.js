import React from "react";
import styled from "styled-components";

import Select from "./select";
import arrow from "../images/arrow-down.svg";

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

  select {
    background: none;
    border: none;
    appearance: none;
    background:
      url(${arrow}) no-repeat right 1rem center;
    padding: 1rem 2rem 1rem 1rem;
    cursor: pointer;
  }
`;

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

const Filters = () => (
  <StyledFilters>
    <Select items={locationOptions} />
    <Select items={sortOptions} />
    <input type="checkbox" id="wifi" name="wifi" />
    <label htmlFor="wifi">Wi-fi</label>
    <input type="checkbox" id="food" name="food" />
    <label htmlFor="food">Food</label>
  </StyledFilters>
);

export default Filters;
