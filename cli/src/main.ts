#!/usr/bin/env node

import { isCancel, log } from "@clack/prompts";
import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join as pathJoin } from "node:path";
import { styleText } from "node:util";
import { downloadAndExtractFile } from "./degit.ts";
import { promptDirectory, promptTemplate } from "./prompts.ts";

function handleSigTerm() {
  return process.exit(0);
}

process.on("SIGINT", handleSigTerm);
process.on("SIGTERM", handleSigTerm);

function logCancel(): void {
  log.error("Operation cancelled");
}

const directory = await promptDirectory();
if (isCancel(directory)) {
  logCancel();
  process.exit();
}

if (existsSync(pathJoin(process.cwd(), directory))) {
  log.error("This folder already exists");
  process.exit(1);
}

const template = await promptTemplate();
if (isCancel(template)) {
  logCancel();
  process.exit();
}

const outputDestination = await downloadAndExtractFile(
  `https://github.com/yovach/create-docker-starter`,
  `templates/${template}`,
  directory,
);
const paths = await readdir(outputDestination);
if (paths.length === 0) {
  log.error("No files were found in the output directory");
  process.exit(1);
}

const lines = [
  `Project "${styleText(["bold"], directory)}" created successfully!`,
  `Follow these steps to get started:`,
  `- cd ${outputDestination}`,
  `- make dev`,
];

log.info(lines.join("\n"));
