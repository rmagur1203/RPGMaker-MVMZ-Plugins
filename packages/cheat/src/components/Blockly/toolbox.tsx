import React from "react";

export const Xml = React.forwardRef((props: any, ref) => {
  const { children, ...rest } = props;
  rest.is = "blockly";
  return React.createElement("xml", { ...rest, ref }, children);
});

export const Category = (props: {
  name: string;
  colour?: string;
  custom?: string;
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  const { children, ...rest } = props;
  rest.is = "blockly";
  return React.createElement("category", rest, children);
};

export const Block = (props: {
  type: string;
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  const { children, ...rest } = props;
  rest.is = "blockly";
  return React.createElement("block", rest, children);
};

export const Field = (props: {
  name: string;
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  const { children, ...rest } = props;
  rest.is = "blockly";
  return React.createElement("field", rest, children);
};

export const Value = (props: {
  name: string;
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  const { children, ...rest } = props;
  rest.is = "blockly";
  return React.createElement("value", rest, children);
};

export const Shadow = (props: {
  type: string;
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  const { children, ...rest } = props;
  rest.is = "blockly";
  return React.createElement("shadow", rest, children);
};

export const Sep = (props: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  const { children, ...rest } = props;
  rest.is = "blockly";
  return React.createElement("sep", rest, children);
};

export const Mutation = (props: {
  [key: string]: any;
  children?: React.ReactNode;
}) => {
  const { children, ...rest } = props;
  rest.is = "blockly";
  return React.createElement("mutation", rest, children);
};
