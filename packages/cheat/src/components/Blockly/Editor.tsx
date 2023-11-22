import React, { useState, useEffect } from "react";
import Blockly from "node-blockly/browser";
import RawBlockly from "blockly";
import BlocklyDrawer, { Tool, Block, Category } from "react-blockly-drawer";
import { Box, Modal } from "@mui/material";

interface EditorProps {
  open: boolean;
  onClose: () => void;
}

const helloWorld: Tool = {
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

  useEffect(() => {
    console.log(json);
  }, [json]);

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
