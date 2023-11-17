import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Option from "./components/option";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Menu onClick={() => toggle()}>
      <Button>
        <span>LocalSave</span>
        <Icon className="bx bx-chevron-down" $active={isOpen}></Icon>
      </Button>
      {isOpen && (
        <Options>
          <Option icon="bx-save" text="Load" />
          <Option icon="bx-download" text="Download" />
          <Option icon="bx-reset" text="Reset" />
        </Options>
      )}
    </Menu>
  );
};

export default App;

const Menu = styled.div`
  cursor: pointer;
`;

const Button = styled.div`
  display: flex;
  background: #fff;
  padding: 16px;
  font-size: 18px;
  font-weight: 400;
  border-radius: 8px;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  i {
    font-size: 25px;
    transition: 0.3s;
  }
`;

const Options = styled.ul`
  position: relative;
  padding: 8px;
  margin-top: 10px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
`;

const Icon = styled.i<{ $active: boolean }>`
  transform: ${({ $active }) => ($active ? "rotate(-180deg)" : "rotate(0)")};
`;
