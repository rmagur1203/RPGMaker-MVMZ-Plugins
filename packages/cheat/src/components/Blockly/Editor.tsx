import React, { useState } from "react";
import { BlocklyWorkspace } from "react-blockly";
import { Box, Modal } from "@mui/material";
import styled from "styled-components";

interface EditorProps {
  open: boolean;
  onClose: () => void;
}

const toolboxCategories = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Logic",
      colour: "#5C81A6",
      contents: [
        {
          kind: "block",
          type: "controls_if",
        },
        {
          kind: "block",
          type: "logic_compare",
        },
      ],
    },
    {
      kind: "category",
      name: "Math",
      colour: "#5CA65C",
      contents: [
        {
          kind: "block",
          type: "math_round",
        },
        {
          kind: "block",
          type: "math_number",
        },
      ],
    },
    {
      kind: "category",
      name: "Custom",
      colour: "#5CA699",
      contents: [
        {
          kind: "block",
          type: "new_boundary_function",
        },
        {
          kind: "block",
          type: "return",
        },
      ],
    },
  ],
};

export default function ({ open, onClose }: EditorProps) {
  const [json, setJson] = useState<object>();
  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        zIndex: 11000,
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "calc(100% - 48px)",
          height: "calc(100% - 48px)",
          margin: "24px",
        }}
      >
        <Workspace
          toolboxConfiguration={toolboxCategories}
          workspaceConfiguration={{
            grid: {
              spacing: 20,
              length: 3,
              colour: "#ccc",
              snap: true,
            },
          }}
          initialJson={json}
          onJsonChange={setJson}
        />
      </Box>
    </Modal>
  );
}

const Workspace = styled(BlocklyWorkspace)`
  width: 100%;
  height: 100%;
`;
