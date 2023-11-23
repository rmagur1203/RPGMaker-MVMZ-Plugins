import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  zIndex?: number;
  open?: boolean;
  onClose?: () => void;
};

export default function Modal({ children, zIndex, open, onClose }: Props) {
  return (
    <Wrapper $visible={open} $zIndex={zIndex} onClick={() => onClose?.()}>
      <Container onClick={(e) => e.stopPropagation()}>{children}</Container>
    </Wrapper>
  );
}

const Wrapper = styled.div<{
  $visible?: boolean;
  $zIndex?: number;
}>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ $zIndex }) => $zIndex ?? 1001};

  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  /* max-width: 480px;
  max-height: 80%; */
  margin: 0 20px;

  padding: 16px;
  border-radius: 8px;
`;
