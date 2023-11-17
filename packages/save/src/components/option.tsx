import React from "react";
import styled from "styled-components";

const $ = (classes: string[]) => classes.join(" ");

type Props = {
  icon: string;
  text: string;
  color?: string;
  onClick?: () => void;
};

export default function ({ icon, text, color, onClick }: Props) {
  return (
    <Option onClick={onClick}>
      <Icon className={$(["bx", icon])} $color={color}></Icon>
      <Text>{text}</Text>
    </Option>
  );
}

const Option = styled.li`
  display: flex;
  cursor: pointer;
  padding: 4px 16px;
  border-radius: 8px;
  align-items: center;
  background: #fff;

  &:hover {
    background: #f2f2f2;
  }
`;

const Icon = styled.i<{ $color?: string }>`
  font-size: 25px;
  margin-right: 12px;
  color: ${({ $color }) => $color || "#171515"};
`;

const Text = styled.span`
  font-size: 18px;
  color: #333;
`;
