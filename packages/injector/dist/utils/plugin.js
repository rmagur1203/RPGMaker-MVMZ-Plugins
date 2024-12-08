"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPluginJSPath = getPluginJSPath;
const path_1 = __importDefault(require("path"));
function getPluginJSPath(root) {
    return path_1.default.join(root, "js", "plugins.js");
}
