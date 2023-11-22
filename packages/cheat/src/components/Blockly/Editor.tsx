import React, { useState } from "react";
import { BlocklyWorkspace } from "react-blockly";
import Blockly from "node-blockly";
import BlocklyDrawer, { Block, Category } from "react-blockly-drawer";
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

const helloWorld = {
  name: "HelloWorld",
  category: "Demo",
  block: {
    init: function () {
      this.jsonInit({
        message0: "Hello %1",
        args0: [
          {
            type: "field_input",
            name: "NAME",
            check: "String",
          },
        ],
        output: "String",
        colour: 160,
        tooltip: "Says Hello",
      });
    },
  },
  generator: (block) => {
    const message = `'${block.getFieldValue("NAME")}'` || "''";
    const code = `console.log('Hello ${message}')`;
    return [code, Blockly.JavaScript.ORDER_MEMBER];
  },
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
        <BlocklyDrawer
          tools={[helloWorld]}
          onChange={(code, workspace) => {
            console.log(code, workspace);
          }}
          language={Blockly.JavaScript}
          appearance={{
            categories: {
              Demo: {
                colour: "270",
              },
            },
          }}
        >
          <Category name="Variables" custom="VARIABLE" />
          <Category name="Values">
            <Block type="math_number" />
            <Block type="text" />
          </Category>
        </BlocklyDrawer>
      </Box>
    </Modal>
  );
}

const Workspace = styled(BlocklyWorkspace)`
  width: 100%;
  height: 100%;
`;
