import path from "path";

export function getPluginJSPath(root: string) {
  return path.join(root, "js", "plugins.js");
}
