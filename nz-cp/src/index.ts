#!/usr/bin/env node

import { readdir } from "node:fs/promises";
import { program } from "commander";
const fs = require("fs");

program
  .version("0.0.1")
  .option(
    "-r,--recursive",
    "allows you to copy directories recursively, that is, together with all their files and subfolders",
  )
  .arguments("<source> <destination>")
  .action((source, destination, options) => {
    const isRecursive = options.recursive;
    if (isRecursive) {
      fs.cp(source, destination, { recursive: true }, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      fs.copyFile(source, destination, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
program.parse(process.argv);
