declare module "react-blockly-drawer" {
  import React from "react";
  import Blockly from "blockly";

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

  export declare const Mutation: React.FunctionComponent<{
    divisor_input?: string;
    op?: string;
    items?: string;
    at?: string;
    at1?: string;
    at2?: string;
    type?: string;
    statement?: string;
    mode?: string;
    children?: React.ReactNode;
  }>;

  export declare const Block: React.FunctionComponent<{
    type: string;
    children?: React.ReactNode;
  }>;

  export declare const Category: React.FunctionComponent<{
    name: string;
    colour?: string;
    custom?: string;
    children?: React.ReactNode;
  }>;

  export declare const Field: React.FunctionComponent<{
    id?: string;
    name: string;
    children?: React.ReactNode;
  }>;

  export declare const Value: React.FunctionComponent<{
    name: string;
    children?: React.ReactNode;
  }>;

  export declare const Shadow: React.FunctionComponent<{
    type: string;
    children?: React.ReactNode;
  }>;

  export declare const Sep: React.FunctionComponent<{}>;
}
