declare module "react-blockly-drawer" {
  import React from "react";
  import Blockly from "node-blockly";

  export type Tool = {
    name: string;
    category: string;
    block: {
      init: (this: Blockly.Block) => void;
    };
    generator: (block: Blockly.Block) => void;
  };

  export default React.Component<{
    tools: Tool[];
    language?: object;
    injectOptions?: object;
    workspaceXML?: string;
    appearance?: object;
    onChange?: (code: string, xml: string) => any;
    children?: React.ReactNode;
    className?: string;
    style?: object;
  }>;

  export declare const Block: React.FunctionComponent<{
    type: string;
  }>;

  export declare const Category: React.FunctionComponent<{
    name: string;
    custom?: string;
    children?: React.ReactNode;
  }>;
}
