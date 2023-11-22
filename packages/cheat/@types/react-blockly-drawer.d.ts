declare module "react-blockly-drawer" {
  export default React.Component<{
    tools?: any;
    onChange?: (any, any) => any;
    language?: any;
    appearance?: any;
    children?: any;
  }>;

  export const Category: React.Component<{
    name: string;
    custom: string;
    children?: any;
  }>;
}
