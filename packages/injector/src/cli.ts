#!/usr/bin/env node
import { program } from "commander";
import inject from ".";
import { resolve } from "path";

program.name("injector");

program
  .argument("path", "Path to the file to inject")
  .requiredOption("-f, --file <file>", "file path to inject")
  .requiredOption("-i, --info <info>", "info file path to inject")
  .option("-s, --setup <setup>", "setup file path to inject")
  .action((path, options) => {
    inject(
      path,
      resolve(options.file),
      resolve(options.info),
      options.setup && resolve(options.setup)
    );
  });

program.parse(process.argv);
