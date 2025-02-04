#!/usr/bin/env node

import { readdir } from "node:fs/promises";
import { program } from "commander";
program
  .version("0.0.1")
  .option(
    "-a, --all",
    "displays all files including hidden files starting with dots",
  )
  .option(
    "-l, --format=long",
    "In addition to each file name, the file type, file permissions, number of links to the file, owner name, group name, file size in bytes, and timestamp (the time the file was last modified, unless otherwise specified) are displayed. For files with a time more than 6 months ago or more than 1 hour into the future, the timestamp contains the year instead of the time.",
  )
  .option("-la", "-a and -l")
  .argument("[directory]", "directory to list", ".")
  .parse(process.argv);

const opts = program.opts();
const path = program.args[0] || ".";

try {
  let files = await readdir(path);
  if (!opts.all) {
    files = files.filter((file) => !file.startsWith("."));
  }
  for (const file of files) console.log(file);
} catch (err) {
  console.error(err);
}
