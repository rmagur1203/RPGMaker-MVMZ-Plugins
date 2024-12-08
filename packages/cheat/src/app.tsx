import React, { useState, useCallback, useEffect } from "react";
import Panels from "./panel";
import styled from "@emotion/styled";
import { ThemeProvider, createTheme } from "@mui/material";
import "./tailwind.css";

const App = () => {
  const [visible, setVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const onKeyUp = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey && event.shiftKey && event.code === "KeyE") {
      console.log("toggle");
      setVisible((visible) => !visible);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", onKeyUp);
    return () => document.removeEventListener("keyup", onKeyUp);
  }, []);

  useEffect(() => {
    ref.current?.addEventListener("contextmenu", (event) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
    });
  }, [ref.current]);

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <Wrapper $visible={visible}>
      <ThemeProvider theme={theme}>
        <Panels />
      </ThemeProvider>
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  $visible: boolean;
}>`
  display: ${({ $visible }) => ($visible ? "block" : "none")};
  width: 100%;
  height: 100%;
`;

export default App;
