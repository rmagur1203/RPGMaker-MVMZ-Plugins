#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const _1 = __importDefault(require("."));
const path_1 = require("path");
commander_1.program.name("injector");
commander_1.program
    .argument("path", "Path to the file to inject")
    .requiredOption("-f, --file <file>", "file path to inject")
    .requiredOption("-i, --info <info>", "info file path to inject")
    .option("-s, --setup <setup>", "setup file path to inject")
    .action((path, options) => {
    (0, _1.default)(path, (0, path_1.resolve)(options.file), (0, path_1.resolve)(options.info), options.setup && (0, path_1.resolve)(options.setup));
});
commander_1.program.parse(process.argv);
