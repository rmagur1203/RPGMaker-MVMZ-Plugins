export function Params(pluginName: string) {
  const params = PluginManager.parameters(pluginName);

  function parse(value: Record<string, any>) {
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        const element = value[key];
        if (typeof element === "object") {
          parse(element);
        } else if (typeof element === "string") {
          try {
            value[key] = JSON.parse(element);
            parse(value[key]);
          } catch (error) {
            value[key] = element;
          }
        } else {
          value[key] = element;
        }
      }
    }
  }

  parse(params);

  return params;
}

export default {
  Params,
};
