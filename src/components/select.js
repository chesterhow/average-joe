import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import arrow from "../images/arrow-down.svg";

const StyledSelect = styled.div`
  display: inline-block;
  cursor: pointer;
  user-select: none;
  vertical-align: top;

  span {
    display: block;
    background: url(${arrow}) no-repeat right 1rem center;
    padding: 1rem 2rem 1rem 1rem;
  }
`;

const StyledDropDown = styled.div`
  position: absolute;
  z-index: 3;
  background-color: ${props => props.theme.goldLight};
  box-shadow: inset 0 0 0 2px ${props => props.theme.goldPale};
  text-align: left;

  li {
    padding: 0.4rem 2rem 0.4rem 1rem;
    color: ${props => props.theme.goldPale};
    list-style-type: none;

    :hover {
      background: ${props => props.theme.goldPale};
      color: ${props => props.theme.gold};
      text-decoration: underline;
    }
  }
`;

const Select = ({ items }) => {
  const node = useRef();
  const [open, toggleDropdown] = useState(false);
  const [selected, setSelected] = useState(items[0]);

  const handleOutsideClick = (event) => {
    if (node.current.contains(event.target)) {
      return;
    }

    toggleDropdown(false);
  }

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [open]);

  const updateSelection = (item) => {
    setSelected(item);
    toggleDropdown(!open);
  }

  const renderDropdown = () => {
    if (open) {
      return (
        <StyledDropDown>
          {items.map(item => (
            <li
              key={item.id}
              onClick={() => updateSelection(item)}
            >
              {item.label}
            </li>
          ))}
        </StyledDropDown>
      );
    }
  }

  return (
    <StyledSelect ref={node}>
      <span onClick={() => toggleDropdown(!open)}>
        {selected.label}
      </span>
      {renderDropdown()}
    </StyledSelect>
  );
};

export default Select;
