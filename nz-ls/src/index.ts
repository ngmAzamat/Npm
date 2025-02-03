#!/usr/bin/env node
import { readdir } from "node:fs/promises";
import { program } from "commander";
program
  .version("0.0.1")
  .option(
    "-a, --all",
    "displays all files including hidden files starting with dots",
  )
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
